import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product: Product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  create(data: CreateProductDto): Product {
    const newProduct: Product = this.productRepository.create(data);

    this.productRepository.save(newProduct);

    return newProduct;
  }

  async update(id: number, changes: UpdateProductDto): Promise<Product> {
    const product: Product = await this.findOne(id);
    this.productRepository.merge(product, changes);
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<Product> {
    const product: Product = await this.findOne(id);
    return this.productRepository.remove(product);
  }
}
