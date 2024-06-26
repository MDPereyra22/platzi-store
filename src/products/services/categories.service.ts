import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBrandDto } from 'src/products/dtos/brand.dto';
import { CreateCategoryDto } from 'src/products/dtos/category.dto';
import { Category } from 'src/products/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category: Category = await this.categoryRepository.findOne({
      where: { id },
      relations: {products: true}
    });
    if (!category) {
      throw new NotFoundException('This category not found');
    }
    return category;
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    const newCategory: Category = this.categoryRepository.create(data);
    return await this.categoryRepository.save(newCategory);
  }

  async update(id: number, changes: UpdateBrandDto): Promise<Category> {
    const category: Category = await this.findOne(id);
    this.categoryRepository.merge(category, changes);
    return this.categoryRepository.save(changes);
  }

  async remove(id: number): Promise<Category> {
    const category: Category = await this.findOne(id);
    return this.categoryRepository.remove(category);
  }
}
