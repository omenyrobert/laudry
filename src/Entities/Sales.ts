import {startOfDay, endOfDay} from "date-fns";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  In,
  ManyToOne,
  Between
} from "typeorm";
import { Stock } from "./Stock";
import { Customer } from "./Customer";


@Entity()
export class Sales extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column()
  quantity!: number;

  @Column({
    default: true,
  })
  paid!: boolean;

  @ManyToOne(() => Stock, (stock) => stock.sales, {
    onDelete: "CASCADE",
    eager: true,
  })
  stock!: Stock;

  @ManyToOne(() => Customer, (customer) => customer.sales, {
    onDelete: "CASCADE",
    eager: true,
  })
  customer!: Customer;

}


export const createSale = async (
  date: string,
  quantity: number,
  stockId: number,
  customerId: number | null = null,
  paymentDate: string | null = null,
) => {
  const stock = await Stock.findOne({
    where: {
      id: stockId,
    },
  });

  let customer = null 
  if (customerId) {
    customer = await Customer.findOne({
      where: {
        id: customerId,
      },
    });
  }

  if (!stock) {
    throw new Error("Stock not found");
  }

  const sales = new Sales();
  sales.date = new Date(date);
  sales.quantity = quantity;
  sales.stock = stock;
  
  if (customer) {
    sales.customer = customer;
    sales.paid = false;
    if (paymentDate) {
      sales.date = new Date(paymentDate);
    }
  }


  await sales.save();

  stock.qty -= quantity;
  await stock.save();

  return sales;
}


export const getSales = async (
  page = 1,
) => {
  const sales = await Sales.find({
    order: {
      id: "DESC",
    },
    take: 30 * page,
  });
  return sales;
}

export const getSalesByDate = async (
  date: string,
) => {
  const validDate = new Date(date);

  if (isNaN(validDate.getTime())) {
    throw new Error("Invalid Date");
  }
  
  const sales = await Sales.find({
    where: {
      date: Between(startOfDay(validDate), endOfDay(validDate))
    },
    order: {
      id: "DESC",
    },
  });
  return sales;
}
