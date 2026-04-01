import { IsString, IsNotEmpty, IsOptional, IsUrl, IsNumber, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @IsNotEmpty()
  videoUrl: string;

  @IsString()
  @IsOptional()
  content?: string;

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
