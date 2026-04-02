import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CategoryRepository } from './repositories/category.repository';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existing = await this.categoryRepository.findByName(createCategoryDto.name);
    if (existing) {
      throw new ConflictException(`Category with name ${createCategoryDto.name} already exists`);
    }
    return this.categoryRepository.create(createCategoryDto);
  }

  async findAll() {
    return this.categoryRepository.findAll();
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.categoryRepository.delete(id);
  }
}
