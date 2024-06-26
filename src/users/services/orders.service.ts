import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository : Repository<Order>,
    @InjectRepository(Customer) private customerRepository : Repository<Customer>
  ){}

  async findAll() : Promise<Order[]>{
    return await this.orderRepository.find()
  }

  async findOne(id: number) : Promise<Order>{
    const order : Order = await this.orderRepository.findOneBy({id})
    if(!order){
      throw new NotFoundException('Order not found')
    }
    return order
  }

  async create(data: CreateOrderDto) : Promise<Order>{
    const order = new Order();
    if(data.customerId){
      const customer : Customer = await this.customerRepository.findOneBy({id:data.customerId})
      order.customer = customer
    }
    return this.orderRepository.save(order)
  }

  async update(id: number, changes: UpdateOrderDto) : Promise<Order>{
    const order = await this.orderRepository.findOneBy({id})
    if(changes.customerId){
      const customer : Customer =  await this.customerRepository.findOneBy({id: changes.customerId})
      order.customer = customer
    }
    return this.orderRepository.save(order)
  }

  async remove(id: number) : Promise<Order> {
    const order = await this.orderRepository.findOneBy({id})
    return this.orderRepository.remove(order)
  }


}
