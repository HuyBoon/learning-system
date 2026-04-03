import { Controller, Post, Body, Get, Param, UseGuards, Request, Patch } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/dto/auth.dto';
import { EnrollmentStatus } from '@prisma/client';

@Controller('enrollments')
@UseGuards(JwtAuthGuard)
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post(':courseId')
  enroll(@Param('courseId') courseId: string, @Request() req: any) {
    return this.enrollmentService.enroll(req.user.userId, courseId);
  }

  @Get('my-enrollments')
  findByUser(@Request() req: any) {
    return this.enrollmentService.findByUser(req.user.userId);
  }

  @Get('course/:courseId')
  @UseGuards(RolesGuard)
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  findByCourse(@Param('courseId') courseId: string) {
    return this.enrollmentService.findByCourse(courseId);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: EnrollmentStatus,
  ) {
    return this.enrollmentService.updateStatus(id, status);
  }

  @Get('check/:courseId')
  checkEnrollment(@Param('courseId') courseId: string, @Request() req: any) {
    return this.enrollmentService.checkEnrollment(req.user.userId, courseId);
  }

  @Get('all')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.enrollmentService.findAll();
  }

  @Get('enrolled-students')
  @UseGuards(RolesGuard)
  @Roles(Role.INSTRUCTOR)
  findEnrolledStudents(@Request() req: any) {
    return this.enrollmentService.findEnrolledEnrollments(req.user.userId);
  }
}

