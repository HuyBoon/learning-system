import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as PrismaClientNamespace from '@prisma/client';

// Use a type alias for flexibility while the generated client is in flux
type Lesson = any;
type Material = any;
type Prisma = any;

export type LessonWithMaterials = any;

@Injectable()
export class LessonRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: any): Promise<any> {
    return (this.prisma.lesson as any).create({ data });
  }


  async findById(id: string): Promise<LessonWithMaterials | null> {
    const result = await this.prisma.lesson.findUnique({ 
      where: { id },
      include: {
        course: {
          select: {
            id: true,
            instructorId: true,
          }
        },
        materials: true,
      } as any
    });
    
    return result as any as LessonWithMaterials | null;
  }


  async update(id: string, data: any): Promise<any> {
    return (this.prisma.lesson as any).update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<any> {
    return (this.prisma.lesson as any).delete({ where: { id } });
  }

  async findByCourseId(courseId: string): Promise<any[]> {
    const result = await (this.prisma.lesson as any).findMany({
      where: { courseId },
      include: {
        materials: true,
      } as any,
      orderBy: { order: 'asc' },
    });

    return result as any[];
  }

  async updateOrder(id: string, order: number): Promise<any> {
    return (this.prisma.lesson as any).update({
      where: { id },
      data: { order },
    });
  }

  async reorderLessons(courseId: string): Promise<void> {
    const lessons = await this.findByCourseId(courseId);
    await (this.prisma as any).$transaction(
      lessons.map((lesson: any, index: number) =>
        (this.prisma.lesson as any).update({
          where: { id: lesson.id },
          data: { order: index },
        }),
      ),
    );
  }

  async updateManyOrders(orders: { id: string; order: number }[]): Promise<void> {
    await (this.prisma as any).$transaction(
      orders.map((o: any) =>
        (this.prisma.lesson as any).update({
          where: { id: o.id },
          data: { order: o.order },
        }),
      ),
    );
  }
}



