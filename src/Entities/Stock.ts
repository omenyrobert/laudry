
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  In,
  ManyToOne,
} from "typeorm";
// import { Student } from "./Student";
import { Category } from "./Category";

@Entity()
export class Stock extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  date!: string;

  @Column()
  qty!: number;

  @Column()
  unitCost!: number;

  @Column()
  unitSell!: number;

  @Column()
  warningAt!: number;


  @ManyToOne(() => Category, (category) => category.stocks, {
    onDelete: "CASCADE",
    eager: true,
  })
  category!: Category;
}

export const getStocks = async () => {
  const stocks = await Stock.find({
    order: {
      id: "DESC",
    },
  });
  return stocks;
};

export const createStock = async (
  name: string,
  date: string,
  qty: number,
  unitCost: number,
  unitSell: number,
  categoryId: number,
  warningAt: number,
) => {

  const category = await Category.findOne({ where: { id: categoryId } });


  const stock = new Stock();
  stock.name = name;
  stock.date = date;
  stock.qty = qty;
  stock.unitCost = unitCost;
  stock.unitSell = unitSell;

  if (category) {
    stock.category = category;
  }

  stock.warningAt = warningAt;

  await stock.save();

  return stock;
};

export const deleteStock = async (id: number) => {
  const stock = await Stock.delete(id);
  if (stock) {
    return "Stock Deleted";
  }
};

export const updateStock = async (
  id: number,
  name: string,
  date: string,
  qty: number,
  unitCost: number,
  unitSell: number,
  categoryId: number,
  warningAt: number,
) => {
  const category = await Category.findOne({ where: { id: categoryId } });

  const stock = await Stock.findOne({ where: { id: id } });

  if (!stock) {
    throw new Error("Stock not found!");
  }

  stock.name = name;
  stock.date = date;
  stock.qty = qty;
  stock.unitCost = unitCost;
  stock.unitSell = unitSell;

  if (category) {
    stock.category = category;
  }

  stock.warningAt = warningAt;

  await stock.save();

  return stock;
};

export const getSingleStock = async (id: number) => {
  const stock = await Stock.findOne({ where: { id: id } });
  return stock;
};


export const restock = async (
  id: number,
  qty: number,
  unitCost: number,
  unitSell: number,
  date: string,
) => {
  const stock = await Stock.findOne({ where: { id: id } });

  if (!stock) {
    throw new Error("Stock not found!");
  }

  stock.qty = stock.qty + qty;
  stock.unitCost = unitCost;
  stock.unitSell = unitSell;
  stock.date = date;

  await stock.save();

  return stock;
}
