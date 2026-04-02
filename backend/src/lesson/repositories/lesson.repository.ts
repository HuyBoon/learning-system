import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Lesson } from '@prisma/client';

@Injectable()
export class LessonRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.LessonUncheckedCreateInput): Promise<Lesson> {
    return this.prisma.lesson.create({ data });
  }

  async findById(id: string): Promise<Lesson | null> {
    return this.prisma.lesson.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.LessonUpdateInput): Promise<Lesson> {
    return this.prisma.lesson.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Lesson> {
    return this.prisma.lesson.delete({ where: { id } });
  }

  async findByCourseId(courseId: string): Promise<Lesson[]> {
    return this.prisma.lesson.findMany({
      where: { courseId },
      orderBy: { order: 'asc' },
    });
  }

  async updateOrder(id: string, order: number): Promise<Lesson> {
    return this.prisma.lesson.update({
      where: { id },
      data: { order },
    });
  }

  async reorderLessons(courseId: string): Promise<void> {
    const lessons = await this.findByCourseId(courseId);
    await this.prisma.$transaction(
      lessons.map((lesson, index) =>
        this.prisma.lesson.update({
          where: { id: lesson.id },
          data: { order: index },
        }),
      ),
    );
  }
}
