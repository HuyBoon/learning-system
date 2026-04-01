import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto, UpdateLessonDto, ReorderLessonsDto } from './dto/lesson.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/dto/auth.dto';

@Controller('lessons')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  create(@Body() createLessonDto: CreateLessonDto, @Request() req: any) {
    return this.lessonService.create(createLessonDto, req.user.userId, req.user.role);
  }

  @Get('course/:courseId')
  findByCourse(@Param('courseId') courseId: string) {
    return this.lessonService.findByCourse(courseId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto, @Request() req: any) {
    return this.lessonService.update(id, updateLessonDto, req.user.userId, req.user.role);
  }

  @Delete(':id')
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  remove(@Param('id') id: string, @Request() req: any) {
    return this.lessonService.remove(id, req.user.userId, req.user.role);
  }

  @Patch('reorder/:courseId')
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  reorder(
    @Param('courseId') courseId: string,
    @Body() reorderDto: ReorderLessonsDto,
    @Request() req: any
  ) {
    return this.lessonService.reorder(courseId, reorderDto.lessonIds, req.user.userId, req.user.role);
  }
}
