import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { ProductsModule } from 'src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';


@Module({
  imports:[ProductsModule, TypeOrmModule.forFeature([User, Customer])],
  controllers:[CustomersController, UsersController],
  providers: [CustomersService, UsersService]
})
export class UsersModule {}
