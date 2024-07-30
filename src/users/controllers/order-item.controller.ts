import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItemService } from '../services/order-item.service';
import { OrderItem } from '../entities/order-product.entity';

@Controller('order-item')
export class OrderItemController {
  constructor(private itemsService: OrderItemService) {}
  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.findOne(id);
  }
  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.itemsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    return this.itemsService.update(id, changes);
  }


  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.remove(+id);
  }
}
