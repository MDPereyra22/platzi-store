import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brand.dto';
import { Brand } from 'src/products/entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  async findAll(): Promise<Brand[]> {
    return await this.brandRepository.find();
  }

  async findOne(id: number): Promise<Brand> {
    const brand: Brand = await this.brandRepository.findOne({
      where: { id },
      relations: { products: true },
    });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return brand;
  }

  async create(data: CreateBrandDto): Promise<Brand> {
    const newBrand: Brand = this.brandRepository.create(data);
    return await this.brandRepository.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto): Promise<Brand> {
    const brand: Brand = await this.findOne(id);
    this.brandRepository.merge(brand, changes);
    return this.brandRepository.save(changes);
  }

  async remove(id: number) {
    const brand: Brand = await this.findOne(id);
    return this.brandRepository.remove(brand);
  }
}
