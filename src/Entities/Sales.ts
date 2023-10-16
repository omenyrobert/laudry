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

@Entity()
export class Sales extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column()
  quantity!: number;

  @ManyToOne(() => Stock, (stock) => stock.sales, {
    onDelete: "CASCADE",
    eager: true,
  })
  stock!: Stock;

}


export const createSale = async (
  date: string,
  quantity: number,
  stockId: number
) => {
  const stock = await Stock.findOne({
    where: {
      id: stockId,
    },
  });

  if (!stock) {
    throw new Error("Stock not found");
  }

  const sales = Sales.create({
    date,
    quantity,
    stock,
  });

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
