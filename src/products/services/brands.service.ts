import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brand.dto';
import { Brand } from 'src/products/entities/brand.entity';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Brand 1',
      image: 'https://i.imgur.com/U4iGx1j.jpeg',
    },
  ];

  findAll() : Brand[] {
    return this.brands
  }

  findOne(id:number) : Brand {
    const brand = this.brands.find((item) => item.id === id)

    if(!brand){
      throw new NotFoundException('Brand not found')
    }

    return brand
  }

  create(payload: CreateBrandDto){
    this.counterId = this.counterId + 1
    const newBrand = {
      id: this.counterId,
      ...payload
    }

    this.brands.push(newBrand)

    return newBrand
  }

  update(id: number, changes: UpdateBrandDto) {
    const brand = this.findOne(id)
    const index = this.brands.findIndex((item) => item.id === id)

    this.brands[index] = {
      ...brand,
      ...changes
    }

    return this.brands[index]
  }

  remove(id: number){
    const index = this.brands.findIndex((item)=> item.id === id)
    if(index === -1){
      throw new NotFoundException('Brand is not found')
    }
    this.brands.splice(index, 1)
    return true
  }
}
