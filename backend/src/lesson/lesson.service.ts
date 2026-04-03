import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { LessonRepository } from './repositories/lesson.repository';
import { CourseRepository } from '../course/repositories/course.repository';
import { CreateLessonDto, UpdateLessonDto } from './dto/lesson.dto';
import { Role } from '../auth/dto/auth.dto';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

@Injectable()
export class LessonService {
  constructor(
    private lessonRepository: LessonRepository,
    private courseRepository: CourseRepository,
    private cloudinaryService: CloudinaryService,
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

    return (this.lessonRepository as any).create({
      title: createLessonDto.title,
      videoUrl: createLessonDto.videoUrl || null,
      content: createLessonDto.content || null,
      type: createLessonDto.type || 'VIDEO',
      courseId: createLessonDto.courseId,
      order: createLessonDto.order ?? order,
    } as any);
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
    
    if (!lesson.course) {
        throw new NotFoundException('Course information missing for this lesson');
    }

    if ((lesson as any).course.instructorId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to update this lesson');
    }

    return (this.lessonRepository as any).update(id, updateLessonDto);
  }

  async remove(id: string, userId: string, role: string) {
    const lesson = await (this as any).findOne(id);
    
    if (!(lesson as any).course) {
        throw new NotFoundException('Course information missing for this lesson');
    }

    if ((lesson as any).course.instructorId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to delete this lesson');
    }

    // Delete associated materials from Cloudinary if any
    if ((lesson as any).materials) {
      for (const material of (lesson as any).materials) {
        await (this.cloudinaryService as any).deleteFile(material.publicId);
      }
    }

    await (this.lessonRepository as any).delete(id);
    
    // Reorder remaining lessons
    await (this.lessonRepository as any).reorderLessons((lesson as any).courseId);
    
    return { message: 'Lesson deleted successfully' };
  }

  async uploadImage(id: string, file: Express.Multer.File, userId: string, role: string) {
    const lesson = await (this as any).findOne(id);
    
    if (!(lesson as any).course) {
        throw new NotFoundException('Course information missing for this lesson');
    }

    if ((lesson as any).course.instructorId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to upload images for this lesson');
    }

    const folder = `courses/${(lesson as any).course.id}/lessons/${id}/images`;
    try {
      const uploadResult = await (this.cloudinaryService as any).uploadImage(file, folder);
      return { url: uploadResult.secure_url, publicId: uploadResult.public_id };
    } catch (error) {
      throw new BadRequestException('Failed to upload image to Cloudinary');
    }
  }

  async reorder(id: string, newOrder: number, userId: string, role: string) {
    const lesson = await (this as any).findOne(id);
    
    if (!(lesson as any).course) {
        throw new NotFoundException('Course information missing for this lesson');
    }

    if ((lesson as any).course.instructorId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to reorder lessons in this course');
    }

    return (this.lessonRepository as any).updateOrder(id, newOrder);
  }


  async reorderBulk(courseId: string, orders: { id: string; order: number }[], userId: string, role: string) {
    const course = await (this.courseRepository as any).findById(courseId);
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    if ((course as any).instructorId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to reorder lessons in this course');
    }

    return (this.lessonRepository as any).updateManyOrders(orders);
  }
}

