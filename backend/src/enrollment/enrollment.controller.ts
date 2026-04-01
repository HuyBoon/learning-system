import { Controller, Post, Get, Param, UseGuards, Request } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('enrollments')
@UseGuards(JwtAuthGuard)
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post(':courseId')
  enroll(@Param('courseId') courseId: string, @Request() req: any) {
    return this.enrollmentService.enroll(req.user.userId, courseId);
  }

  @Get('my')
  getMyEnrollments(@Request() req: any) {
    return this.enrollmentService.getMyEnrollments(req.user.userId);
  }

  @Get('check/:courseId')
  checkStatus(@Param('courseId') courseId: string, @Request() req: any) {
    return this.enrollmentService.checkStatus(req.user.userId, courseId);
  }
}
