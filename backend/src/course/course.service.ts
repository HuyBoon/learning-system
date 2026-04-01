import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';
import { Role } from '../auth/dto/auth.dto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto, instructorId: string) {
    if (createCourseDto.categoryId) {
        const category = await this.prisma.category.findUnique({
            where: { id: createCourseDto.categoryId }
        });
        if (!category) {
            throw new BadRequestException('Invalid category ID');
        }
    }

    return this.prisma.course.create({
      data: {
        ...createCourseDto,
        instructorId,
      },
    });
  }

  async findAll(categoryId?: string, search?: string) {
    const where: any = {};
    
    if (categoryId) {
      where.categoryId = categoryId;
    }
    
    if (search) {
      where.title = {
        contains: search,
      };
    }

    return this.prisma.course.findMany({
      where,
      include: {
        instructor: {
          select: { id: true, name: true, email: true }
        },
        category: true,
        _count: {
          select: { lessons: true, enrollments: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        instructor: {
          select: { id: true, name: true, email: true }
        },
        category: true,
        lessons: {
          orderBy: { order: 'asc' }
        },
        _count: {
            select: { enrollments: true }
        }
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto, userId: string, role: string) {
    const course = await this.findOne(id);

    // Only the instructor of the course or an admin can update it
    if (course.instructorId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to update this course');
    }

    if (updateCourseDto.categoryId) {
        const category = await this.prisma.category.findUnique({
            where: { id: updateCourseDto.categoryId }
        });
        if (!category) {
            throw new BadRequestException('Invalid category ID');
        }
    }

    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: string, userId: string, role: string) {
    const course = await this.findOne(id);

    // Only the instructor of the course or an admin can delete it
    if (course.instructorId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to delete this course');
    }

    return this.prisma.course.delete({
      where: { id },
    });
  }

  async findInstructorCourses(instructorId: string) {
    return this.prisma.course.findMany({
      where: { instructorId },
      include: {
        category: true,
        _count: {
          select: { lessons: true, enrollments: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
