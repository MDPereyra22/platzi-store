import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/services/products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService : ProductsService
  ){}


  @Get()
  @ApiOperation({summary: 'List of products'})
  findAll() : Product[]{
    return this.productsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) : Product {
    return this.productsService.findOne(id)
  }

  @Post()
  create(@Body() payload: CreateProductDto){
    return this.productsService.create(payload)
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload);

  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
