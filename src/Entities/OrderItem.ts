import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Order } from "./Order";
import { Item } from "./Item";

@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  orderId!: number;

  @Column()
  itemId!: number;

  @Column({ default: 1 })
  quantity!: number;

  @ManyToOne(() => Order, (order) => order.items, {
    onDelete: "CASCADE",
  })
  order!: Order;

  @ManyToOne(() => Item, (item) => item.orderItems, {
    eager: true,
  })
  item!: Item;
}
