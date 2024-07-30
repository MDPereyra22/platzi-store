import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItem } from '../entities/order-product.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(OrderItem) private itemRepository: Repository<OrderItem>,
  ) {}

  async findAll(): Promise<OrderItem[]> {
    return await this.itemRepository.find();
  }

  async findOne(id: number): Promise<OrderItem> {
    const item: OrderItem = await this.itemRepository.findOne({
      where: { id },
      relations: { product: true, order: true },
    });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  async create(data: CreateOrderItemDto) {
    const order: Order = await this.orderRepository.findOneBy({
      id: data.orderId,
    });
    const product: Product = await this.productRepository.findOneBy({
      id: data.productId,
    });
    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;

    return this.itemRepository.save(item);
  }

  async update(id: number, changes: UpdateOrderItemDto): Promise<OrderItem> {
    const item: OrderItem = await this.findOne(id);

    if (changes.orderId) {
      const order: Order = await this.orderRepository.findOneBy({
        id: changes.orderId,
      });
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      item.order = order;
    }

    if (changes.productId) {
      const product: Product = await this.productRepository.findOneBy({
        id: changes.productId,
      });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      item.product = product;
    }

    if (changes.quantity) {
      item.quantity = changes.quantity;
    }

    return this.itemRepository.save(item);
  }

  async remove(id: number) : Promise<OrderItem> {
    const item = await this.itemRepository.findOneBy({id})
    return this.itemRepository.remove(item)
  }
}
