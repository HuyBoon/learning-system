import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentRepository } from './repositories/enrollment.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [PrismaModule, CourseModule],
  providers: [EnrollmentService, EnrollmentRepository],
  controllers: [EnrollmentController],
  exports: [EnrollmentService],
})
export class EnrollmentModule {}
