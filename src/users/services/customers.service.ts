import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/users/dtos/customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepository : Repository<Customer>
  ){}

  async findAll() : Promise<Customer[]> {
    return await this.customerRepository.find()
  }

  async findOne(id: number) : Promise<Customer>{
    const customer : Customer = await this.customerRepository.findOneBy({id})
    if(!customer){
      throw new NotFoundException('Customer not found')
    }
    return customer
  }

  async create(data: CreateCustomerDto) : Promise<Customer>{
    const newCustomer : Customer = this.customerRepository.create(data)
    return await this.customerRepository.save(newCustomer)
  }

  async update(id: number, changes: UpdateCustomerDto) : Promise<Customer>{
    const customer : Customer = await this.findOne(id)
    this.customerRepository.merge(customer, changes)
    return this.customerRepository.save(customer)
  }

  async remove(id: number) : Promise<Customer>{
    const customer : Customer = await this.findOne(id)
    return this.customerRepository.remove(customer)
  }
}
