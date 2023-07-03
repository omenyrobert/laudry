import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class StockType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;
}

export const getStockTypes = async () => {
  const stockTypes = await StockType.find({
    order: {
      id: "DESC",
    },
  });

  return stockTypes;
};

export const addStockType = async (type: string) => {
  const stockTypeToAdd = await StockType.insert({
    type: type,
  });
  return stockTypeToAdd;
};

export const getStockTypeById = async (id: number) => {
  const stockTypeToFindById = await StockType.findOne({ where: { id: id } });
  return stockTypeToFindById;
};

export const getStockTypeByType = async (type: string) => {
  const stockTypeToFindByType = await StockType.findOne({
    where: { type: type },
  });
  return stockTypeToFindByType;
};

export const deleteStockType = async (id: number) => {
  const stockTypeToDelete = await StockType.delete(id);
  if (stockTypeToDelete) {
    return "Stock Type Deleted";
  }
};

export const updateStockType = async (id: number, type: string) => {
  const stockTypeToUpdate = await StockType.update(id, { type: type });
  return stockTypeToUpdate;
};
