import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';
import { In, Repository } from 'typeorm';
import { BrandsService } from './brands.service';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Brand) private brandsRepository: Repository<Brand>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product: Product = await this.productRepository.findOne({
      where: { id },
      relations: { brand: true, categories: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async create(data: CreateProductDto): Promise<Product> {
    const newProduct: Product = this.productRepository.create(data);

    if (data.brandId) {
      const brand = await this.brandsRepository.findOneBy({ id: data.brandId });
      newProduct.brand = brand;
    }
    if (data.categoriesIds) {
      const categories: Category[] = await this.categoryRepository.findBy({
        id: In(data.categoriesIds),
      });
      newProduct.categories = categories;
    }

    this.productRepository.save(newProduct);

    return newProduct;
  }

  async update(id: number, changes: UpdateProductDto): Promise<Product> {
    const product: Product = await this.findOne(id);
    if (changes.brandId) {
      const brand = await this.brandsRepository.findOneBy({
        id: changes.brandId,
      });
      product.brand = brand;
    }
    if (changes.categoriesIds) {
      const categories: Category[] = await this.categoryRepository.findBy({
        id: In(changes.categoriesIds),
      });
      product.categories = categories;
    }
    this.productRepository.merge(product, changes);
    return this.productRepository.save(product);
  }

  async removeCategoryByProdyct(productId: number, categoryId: number) {
    const product: Product = await this.productRepository.findOne({
      where: { id: productId },
      relations: { categories: true },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.categories = product.categories.filter(
      (category) => category.id !== categoryId,
    );
    return this.productRepository.save(product);
  }

  async updateCategoryByProduct(productId: number, categoryId: number) {
    const product: Product = await this.productRepository.findOne({
      where: { id: productId },
      relations: { categories: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const category: Category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    product.categories.push(category)

    console.log(product)
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<Product> {
    const product: Product = await this.findOne(id);
    return this.productRepository.remove(product);
  }
}
