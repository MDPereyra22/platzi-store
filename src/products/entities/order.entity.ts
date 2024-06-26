import { User } from "src/users/entities/user.entity";
import { Product } from "./product.entity";
import { PrimaryGeneratedColumn } from "typeorm";

export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  date: Date;
  user: User;
  products: Product[];
}
