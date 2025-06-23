
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  In,
  ManyToOne,
  OneToMany,
  Like,
} from "typeorm";
import { Category } from "./Category";
import  { Sales } from "./Sales";

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

  @OneToMany(() => Sales, (sales) => sales.stock)
  sales!: Sales[];
}

export const getStocks = async (
  page = 1,
) => {
  const stocks = await Stock.find({
    order: {
      id: "DESC",
    },
    take: 30 * page,
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
  // console.log('id',id);
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


export const searchStock = async (name: string) => {
  const stock = await Stock.find({
    where: {
      // check if name contains the name 
      name: Like(`%${name}%`)
    }
  });
  return stock;
}

export const getAllStocks = async () => {
  const stock = await Stock.find(
    {
      order: {
        id: "DESC",
      },
      relations: ["sales"],
    }

  );
  return stock;
}


// get 10 stocks with the highest sales
export const getTopStocks = async () => {
  const stocks = await Stock.find({
    order: {
      id: "DESC",
    },
    take: 10,
    relations: ["sales"],
  });

  return stocks;
}
