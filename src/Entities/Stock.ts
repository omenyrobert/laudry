
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  In,
} from "typeorm";
// import { Student } from "./Student";
// import { category } from "./Category";

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

  @Column()
  categoryId!: number;

  // @ManyToMany(() => category, (category) => category.type)
  // categories: [];
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
  const stockToInsert = await Stock.insert({
    name,
    date,
    qty,
     unitCost,
    unitSell,
    categoryId,
    warningAt
  });
  return stockToInsert;
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
  const stockUpdate = await Stock.update(id, {
    name: name,
    date: date,
    qty: qty,
    unitCost: unitCost,
    unitSell: unitSell,
    categoryId: unitSell,
    warningAt: warningAt
  });
  return stockUpdate;
};

export const getSingleStock = async (id: number) => {
  const stock = await Stock.findOne({ where: { id: id } });
  return stock;
};

// export const getStockBySelect = async () => {
//   const stock = await Stock.findOne({ where: { is_selected: 1 } });
//   return stock;
// };

// export const selectedStockIds = async (ids: any) => {
//   const selectedstocks = await Stock.find({
//     where: { id: In(ids) },
//   });
//   return selectedstocks;
// };
