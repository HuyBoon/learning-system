import { Controller, Get, Post, Delete, Param, UseGuards, UseInterceptors, UploadedFile, Body, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { MaterialService } from './material.service';

@Controller('materials')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post('upload')
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('lessonId') lessonId: string,
    @Body('title') title: string,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.materialService.uploadMaterial(lessonId, file, title, userId);
  }

  @Get('lesson/:lessonId')
  async findByLesson(@Param('lessonId') lessonId: string) {
    return this.materialService.findByLesson(lessonId);
  }

  @Delete(':id')
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  async delete(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    return this.materialService.deleteMaterial(id, userId);
  }
}
