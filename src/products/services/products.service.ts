import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {

  private counterId = 1

  private products: Product[] = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'Text',
      price: 122,
      stock: 123,
      image: 'asd',
    },
  ];


  findAll() {
    return this.products
  }

  findOne(id: number) {
    const product : Product= this.products.find((item) => item.id === id)

    if(!product){
      throw new NotFoundException('Product not found')
    }
    return product
  }

  create(payload: CreateProductDto) {
    this.counterId = this.counterId + 1
    const newProduct = {
      id: this.counterId,
      ...payload
    }
    this.products.push(newProduct)

    return newProduct
  }

  update(id: number, changes: UpdateProductDto) {
    const product = this.findOne(id);
    const index = this.products.findIndex((item)=> item.id === id)

    this.products[index] = {
      ...product,
      ...changes
    }

    return this.products[index]
  }

  remove(id: number){
    const index = this.products.findIndex((item)=> item.id === id)
    if(index === -1){
      throw new NotFoundException('Brand is not found')
    }
    this.products.splice(index, 1)
    return true
  }

}
