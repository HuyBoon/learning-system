import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { LessonRepository } from './repositories/lesson.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [PrismaModule, CourseModule],
  providers: [LessonService, LessonRepository],
  controllers: [LessonController],
})
export class LessonModule {}
