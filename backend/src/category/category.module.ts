import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './repositories/category.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CategoryService, CategoryRepository],
  controllers: [CategoryController],
  exports: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
