import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonDto, UpdateLessonDto } from './dto/lesson.dto';
import { Role } from '../auth/dto/auth.dto';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  private async verifyCourseOwnership(courseId: string, userId: string, role: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    if (course.instructorId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException('You do not have permission to manage lessons for this course');
    }

    return course;
  }

  async create(createLessonDto: CreateLessonDto, userId: string, role: string) {
    await this.verifyCourseOwnership(createLessonDto.courseId, userId, role);

    // Get the current max order if not provided
    if (createLessonDto.order === undefined) {
      const maxOrderLesson = await this.prisma.lesson.findFirst({
        where: { courseId: createLessonDto.courseId },
        orderBy: { order: 'desc' },
      });
      createLessonDto.order = maxOrderLesson ? maxOrderLesson.order + 1 : 0;
    }

    return this.prisma.lesson.create({
      data: createLessonDto,
    });
  }

  async findByCourse(courseId: string) {
    const course = await this.prisma.course.findUnique({
        where: { id: courseId }
    });
    if (!course) {
        throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    return this.prisma.lesson.findMany({
      where: { courseId },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: { course: true },
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    return lesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto, userId: string, role: string) {
    const lesson = await this.findOne(id);
    await this.verifyCourseOwnership(lesson.courseId, userId, role);

    return this.prisma.lesson.update({
      where: { id },
      data: updateLessonDto,
    });
  }

  async remove(id: string, userId: string, role: string) {
    const lesson = await this.findOne(id);
    await this.verifyCourseOwnership(lesson.courseId, userId, role);

    return this.prisma.lesson.delete({
      where: { id },
    });
  }

  async reorder(courseId: string, lessonIds: string[], userId: string, role: string) {
    await this.verifyCourseOwnership(courseId, userId, role);

    const transaction = lessonIds.map((id, index) =>
      this.prisma.lesson.update({
        where: { id },
        data: { order: index },
      }),
    );

    return this.prisma.$transaction(transaction);
  }
}
