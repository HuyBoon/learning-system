import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Enrollment } from '@prisma/client';

@Injectable()
export class EnrollmentRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.EnrollmentUncheckedCreateInput): Promise<Enrollment> {
    return this.prisma.enrollment.create({ data });
  }

  async findUnique(userId: string, courseId: string): Promise<Enrollment | null> {
    return this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    });
  }

  async findById(id: string): Promise<Enrollment | null> {
    return this.prisma.enrollment.findUnique({ where: { id } });
  }

  async findByUserId(userId: string): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: { course: true },
    });
  }

  async findByCourseId(courseId: string): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      where: { courseId },
      include: { user: true },
    });
  }

  async updateStatus(id: string, status: 'PENDING' | 'COMPLETED'): Promise<Enrollment> {
    return this.prisma.enrollment.update({
      where: { id },
      data: { status },
    });
  }

  async findMany(where: Prisma.EnrollmentWhereInput, include?: Prisma.EnrollmentInclude): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({ where, include });
  }

  async update(id: string, data: Prisma.EnrollmentUpdateInput): Promise<Enrollment> {
    return this.prisma.enrollment.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Enrollment> {
    return this.prisma.enrollment.delete({ where: { id } });
  }
}
