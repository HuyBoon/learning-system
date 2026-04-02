import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { EnrollmentRepository } from './repositories/enrollment.repository';
import { CourseRepository } from '../course/repositories/course.repository';
import { EnrollmentStatus } from '@prisma/client';

@Injectable()
export class EnrollmentService {
  constructor(
    private enrollmentRepository: EnrollmentRepository,
    private courseRepository: CourseRepository,
  ) {}

  async enroll(userId: string, courseId: string) {
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    const existingEnrollment = await this.enrollmentRepository.findUnique(userId, courseId);
    if (existingEnrollment) {
      throw new ConflictException('Already enrolled in this course');
    }

    return this.enrollmentRepository.create({
      userId,
      courseId,
      status: EnrollmentStatus.PENDING,
    });
  }

  async findByUser(userId: string) {
    return this.enrollmentRepository.findByUserId(userId);
  }

  async findByCourse(courseId: string) {
    return this.enrollmentRepository.findByCourseId(courseId);
  }

  async updateStatus(id: string, status: EnrollmentStatus) {
    const enrollment = await this.enrollmentRepository.findById(id);
    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID ${id} not found`);
    }

    return this.enrollmentRepository.updateStatus(id, status);
  }

  async checkEnrollment(userId: string, courseId: string) {
    const enrollment = await this.enrollmentRepository.findUnique(userId, courseId);
    return !!enrollment;
  }
}
