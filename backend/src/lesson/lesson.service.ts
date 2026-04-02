import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { LessonRepository } from './repositories/lesson.repository';
import { CourseRepository } from '../course/repositories/course.repository';
import { CreateLessonDto, UpdateLessonDto } from './dto/lesson.dto';
import { Role } from '../auth/dto/auth.dto';

@Injectable()
export class LessonService {
  constructor(
    private lessonRepository: LessonRepository,
    private courseRepository: CourseRepository,
  ) {}

  async create(createLessonDto: CreateLessonDto, userId: string, role: string) {
    const course = await this.courseRepository.findById(createLessonDto.courseId);
    if (!course) {
      throw new NotFoundException(`Course with ID ${createLessonDto.courseId} not found`);
    }

    if (course.instructorId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to add lessons to this course');
    }

    // Get the current max order
    const lessons = await this.lessonRepository.findByCourseId(createLessonDto.courseId);
    const order = lessons.length > 0 ? Math.max(...lessons.map(l => l.order)) + 1 : 0;

    return this.lessonRepository.create({
      ...createLessonDto,
      order,
    });
  }

  async findByCourse(courseId: string) {
    return this.lessonRepository.findByCourseId(courseId);
  }

  async findOne(id: string) {
    const lesson = await this.lessonRepository.findById(id);
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return lesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto, userId: string, role: string) {
    const lesson = await this.findOne(id);
    const course = await this.courseRepository.findById(lesson.courseId);
    if (!course) {
      throw new NotFoundException(`Course with ID ${lesson.courseId} not found`);
    }

    if (course.instructorId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to update this lesson');
    }

    return this.lessonRepository.update(id, updateLessonDto);
  }

  async remove(id: string, userId: string, role: string) {
    const lesson = await this.findOne(id);
    const course = await this.courseRepository.findById(lesson.courseId);
    if (!course) {
      throw new NotFoundException(`Course with ID ${lesson.courseId} not found`);
    }

    if (course.instructorId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to delete this lesson');
    }

    await this.lessonRepository.delete(id);
    
    // Reorder remaining lessons
    await this.lessonRepository.reorderLessons(lesson.courseId);
    
    return { message: 'Lesson deleted successfully' };
  }

  async reorder(id: string, newOrder: number, userId: string, role: string) {
    const lesson = await this.findOne(id);
    const course = await this.courseRepository.findById(lesson.courseId);
    if (!course) {
      throw new NotFoundException(`Course with ID ${lesson.courseId} not found`);
    }

    if (course.instructorId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to reorder lessons in this course');
    }

    return this.lessonRepository.updateOrder(id, newOrder);
  }
}
