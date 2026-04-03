import { IsString, IsNotEmpty, IsOptional, IsUrl, IsNumber, IsUUID, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { LessonType } from '@prisma/client';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @IsOptional()
  videoUrl?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsEnum(LessonType)
  @IsOptional()
  type?: LessonType;

  @IsUUID()
  @IsNotEmpty()
  courseId: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  order?: number;
}

export class UpdateLessonDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsUrl()
  @IsOptional()
  videoUrl?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsEnum(LessonType)
  @IsOptional()
  type?: LessonType;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  order?: number;
}

export class ReorderLessonsDto {
  @IsUUID(undefined, { each: true })
  @IsNotEmpty({ each: true })
  lessonIds: string[];
}
