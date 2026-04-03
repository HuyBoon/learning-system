import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LessonService } from './lesson.service';
import { CreateLessonDto, UpdateLessonDto } from './dto/lesson.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/dto/auth.dto';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  create(@Body() createLessonDto: CreateLessonDto, @Request() req: any) {
    return this.lessonService.create(createLessonDto, req.user.userId, req.user.role);
  }

  @Post(':id/upload-image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
  ) {
    return this.lessonService.uploadImage(id, file, req.user.userId, req.user.role);
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
    @Request() req: any,
  ) {
    return this.lessonService.update(id, updateLessonDto, req.user.userId, req.user.role);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  remove(@Param('id') id: string, @Request() req: any) {
    return this.lessonService.remove(id, req.user.userId, req.user.role);
  }

  @Put(':id/reorder')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  reorder(
    @Param('id') id: string,
    @Body('newOrder') newOrder: number,
    @Request() req: any,
  ) {
    return this.lessonService.reorder(id, newOrder, req.user.userId, req.user.role);
  }

  @Put('reorder/:courseId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  reorderBulk(
    @Param('courseId') courseId: string,
    @Body('orders') orders: { id: string; order: number }[],
    @Request() req: any,
  ) {
    return this.lessonService.reorderBulk(courseId, orders, req.user.userId, req.user.role);
  }
}
