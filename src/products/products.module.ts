import { Module } from '@nestjs/common';
import { BrandsController } from './controllers/brands.controller';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsService } from './services/brands.service';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';

@Module({
  imports:[],
  controllers: [BrandsController, ProductsController, CategoriesController ],
  providers:[BrandsService, ProductsService, CategoriesService],
  exports:[ProductsService]
})
export class ProductsModule {}
