import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseRepository } from './repositories/course.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CourseService, CourseRepository],
  controllers: [CourseController],
  exports: [CourseService, CourseRepository],
})
export class CourseModule {}
