import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { OrderItem } from "./OrderItem";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string; // customer name

  @Column()
  phone!: string;

  @Column()
  address!: string;

  @Column()
  amount!: number;

  @Column()
  paid!: number;

  // if you want automatic time:
  // @CreateDateColumn()
  // date!: Date;
  @Column()
  date!: string; // or Date, depending on your use

  @Column({
    default: "pending",
  })
  orderStatus!: string; // e.g. pending, in-progress, completed, cancelled

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
  })
  items!: OrderItem[];
}

// ====== Order helpers ======

export const getOrders = async () => {
  const orders = await Order.find({
    relations: ["items", "items.item"],
    order: {
      id: "DESC",
    },
  });
  return orders;
};

interface CreateOrderItemInput {
  itemId: number;
  quantity: number;
}

export const addOrder = async (
  name: string,
  phone: string,
  address: string,
  amount: number,
  paid: number,
  date: string,
  items: CreateOrderItemInput[],
  orderStatus: string = "pending" // optional param if you want to override
) => {
  const order = new Order();
  order.name = name;
  order.phone = phone;
  order.address = address;
  order.amount = amount;
  order.paid = paid;
  order.date = date;
  order.orderStatus = orderStatus; // will be "pending" by default

  order.items = items.map((i) => {
    const oi = new OrderItem();
    oi.itemId = i.itemId;
    oi.quantity = i.quantity;
    return oi;
  });

  const saved = await order.save();
  return saved;
};

export const getOrderById = async (id: number) => {
  const order = await Order.findOne({
    where: { id },
    relations: ["items", "items.item"],
  });
  return order;
};

export const deleteOrder = async (id: number) => {
  const orderToDelete = await Order.delete(id);
  if (orderToDelete) {
    return "Order Deleted";
  }
};

export const updateOrder = async (
  id: number,
  data: Partial<{
    name: string;
    phone: string;
    address: string;
    amount: number;
    paid: number;
    date: string;
    orderStatus: string;
  }>
) => {
  const orderToUpdate = await Order.update(id, data);
  return orderToUpdate;
};

export const updateOrderStatus = async (id: number, orderStatus: string) => {
  const updated = await Order.update(id, { orderStatus });
  return updated;
};

export const updateOrderPaidAmount = async (id: number, paid: number) => {
  const order = await getOrderById(id);
  if (!order) return null;

  const newData: any = { paid };

  // if paid equals amount, mark as paid (or "completed" if you prefer)
  if (paid === order.amount) {
    newData.orderStatus = "paid"; // or "completed"
  }

  const updated = await Order.update(id, newData);
  return updated;
};

export const getAllOrders = async () => {
  const orders = await Order.find({
    relations: ["items", "items.item"],
  });
  return orders;
};
