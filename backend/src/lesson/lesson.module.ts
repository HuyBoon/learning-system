import { Module, forwardRef } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { LessonRepository } from './repositories/lesson.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { CourseModule } from '../course/course.module';
import { CloudinaryModule } from '../common/cloudinary/cloudinary.module';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';
import { MaterialRepository } from './repositories/material.repository';

@Module({
  imports: [PrismaModule, CourseModule, CloudinaryModule],
  providers: [LessonService, LessonRepository, MaterialService, MaterialRepository],
  controllers: [LessonController, MaterialController],
  exports: [LessonService, LessonRepository],
})
export class LessonModule {}
