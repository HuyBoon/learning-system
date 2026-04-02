import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Course } from '@prisma/client';

@Injectable()
export class CourseRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CourseCreateInput): Promise<Course> {
    return this.prisma.course.create({ data });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.CourseWhereInput;
    orderBy?: Prisma.CourseOrderByWithRelationInput;
    include?: Prisma.CourseInclude;
  }): Promise<Course[]> {
    const { skip, take, where, orderBy, include } = params;
    return this.prisma.course.findMany({
      skip,
      take,
      where,
      orderBy,
      include,
    });
  }

  async count(where?: Prisma.CourseWhereInput): Promise<number> {
    return this.prisma.course.count({ where });
  }

  async findById(id: string, include?: Prisma.CourseInclude): Promise<Course | null> {
    return this.prisma.course.findUnique({
      where: { id },
      include,
    });
  }

  async update(id: string, data: Prisma.CourseUpdateInput): Promise<Course> {
    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Course> {
    return this.prisma.course.delete({ where: { id } });
  }
}
