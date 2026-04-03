import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Material } from '@prisma/client';

@Injectable()
export class MaterialRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.MaterialUncheckedCreateInput): Promise<Material> {
    return this.prisma.material.create({ data });
  }

  async findById(id: string): Promise<Material | null> {
    return this.prisma.material.findUnique({ where: { id } });
  }

  async findByLessonId(lessonId: string): Promise<Material[]> {
    return this.prisma.material.findMany({
      where: { lessonId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: string): Promise<Material> {
    return this.prisma.material.delete({ where: { id } });
  }
}
