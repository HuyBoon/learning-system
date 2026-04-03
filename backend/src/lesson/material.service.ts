import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { MaterialRepository } from './repositories/material.repository';
import { LessonRepository } from './repositories/lesson.repository';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';
import * as PrismaClientNamespace from '@prisma/client';

const FileTypeValues = (PrismaClientNamespace as any).FileType || {
  PDF: 'PDF',
  ZIP: 'ZIP',
  IMAGE: 'IMAGE',
  CODE: 'CODE',
  OTHER: 'OTHER',
};

type FileType = any;
const FileType = FileTypeValues;



@Injectable()
export class MaterialService {



  constructor(
    private materialRepository: MaterialRepository,
    private lessonRepository: LessonRepository,
    private cloudinaryService: CloudinaryService,
  ) {}

  async uploadMaterial(
    lessonId: string,
    file: Express.Multer.File,
    title: string,
    userId: string,
  ) {
    const lesson = await this.lessonRepository.findById(lessonId);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    const course = lesson.course; 
    if (!course) {
      throw new NotFoundException('Course associated with this lesson not found');
    }

    if (course.instructorId !== userId) {
      throw new ForbiddenException('You are not authorized to add materials to this lesson');
    }

    const fileType = this.getFileType(file.mimetype);
    const folder = `courses/${course.id}/lessons/${lessonId}/materials`;
    
    try {
      const uploadResult = await this.cloudinaryService.uploadFile(file, folder);
      
      return this.materialRepository.create({
        title,
        fileUrl: uploadResult.secure_url,
        fileType,
        size: file.size,
        publicId: uploadResult.public_id,
        lessonId,
      });
    } catch (error) {
      throw new BadRequestException('Failed to upload material to Cloudinary');
    }
  }

  async findByLesson(lessonId: string) {
    return this.materialRepository.findByLessonId(lessonId);
  }

  async deleteMaterial(id: string, userId: string) {
    const material = await this.materialRepository.findById(id);
    if (!material) {
      throw new NotFoundException('Material not found');
    }

    const lesson = await this.lessonRepository.findById(material.lessonId);
    if (!lesson || !lesson.course) {
      throw new ForbiddenException('You are not authorized to delete this material or course information is missing');
    }

    if (lesson.course.instructorId !== userId) {
      throw new ForbiddenException('You are not authorized to delete this material');
    }

    await this.cloudinaryService.deleteFile(material.publicId);
    return this.materialRepository.delete(id);
  }


  private getFileType(mimetype: string): FileType {
    if (mimetype.startsWith('image/')) return FileType.IMAGE;
    if (mimetype === 'application/pdf') return FileType.PDF;
    if (mimetype.includes('zip') || mimetype.includes('tar') || mimetype.includes('rar')) return FileType.ZIP;
    if (mimetype.includes('javascript') || mimetype.includes('typescript') || mimetype.includes('json') || mimetype.includes('html') || mimetype.includes('css')) return FileType.CODE;
    return FileType.OTHER;
  }
}
