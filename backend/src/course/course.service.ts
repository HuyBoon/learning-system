import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { CourseRepository } from './repositories/course.repository';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';
import { Role } from '../auth/dto/auth.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private courseRepository: CourseRepository) {}

  async create(createCourseDto: CreateCourseDto, instructorId: string) {
    return this.courseRepository.create({
      ...createCourseDto,
      instructor: { connect: { id: instructorId } },
      category: createCourseDto.categoryId ? { connect: { id: createCourseDto.categoryId } } : undefined,
    });
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    categoryId?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const { page = 1, limit = 10, categoryId, search, sortBy = 'createdAt', sortOrder = 'desc' } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.CourseWhereInput = {};
    
    if (categoryId) {
      where.categoryId = categoryId;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [courses, total] = await Promise.all([
      this.courseRepository.findMany({
        skip,
        take: limit,
        where,
        orderBy: { [sortBy]: sortOrder },
        include: {
          instructor: {
            select: { id: true, name: true, email: true }
          },
          category: true,
          _count: {
            select: { lessons: true, enrollments: true }
          }
        },
      }),
      this.courseRepository.count(where),
    ]);

    return {
      data: courses,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findById(id, {
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
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto, userId: string, role: string) {
    const course = await this.findOne(id);

    if (course.instructorId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to update this course');
    }

    return this.courseRepository.update(id, updateCourseDto);
  }

  async remove(id: string, userId: string, role: string) {
    const course = await this.findOne(id);

    if (course.instructorId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to delete this course');
    }

    return this.courseRepository.delete(id);
  }

  async findInstructorCourses(instructorId: string) {
    return this.courseRepository.findMany({
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
