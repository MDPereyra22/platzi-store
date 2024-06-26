import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';
import { Order } from '../entities/order.entity';
import { ProductsService } from 'src/products/services/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject('PG') private clientPg: Client,
    private productsService: ProductsService,
    private configService: ConfigService,
    private customerService: CustomersService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: { customer: true } });
  }

  async findOne(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne({where:{id}, relations:{customer: true}});
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const newUser: User = this.userRepository.create(data);
    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return await this.userRepository.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto): Promise<User> {
    const user: User = await this.findOne(id);
    this.userRepository.merge(user, changes);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user: User = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  // async getOrdersByUser(id: number): Promise<Order> {
  //   const user: User = await this.findOne(id);
  //   return {
  //     user: user,
  //     products: await this.productsService.findAll(),
  //   };
  // }

  getTasks() {
    return new Promise((resolve, rejects) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          rejects(err);
        }
        resolve(res.rows);
      });
    });
  }
}
