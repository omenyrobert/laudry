import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class StockLevels extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: string;

  @Column()
  stock!: string;

  @Column()
  quantity!: number;

  @Column({nullable: true})
  remaining!: number;

  @Column()
  stockType!: number;

  @Column({nullable: true})
  reducedDate!: string;

  @Column({nullable: true})
  takenBy!: string;

  @Column({nullable: true})
  takenByContacts!: string;

  @Column({nullable: true})
  reductions!: string;
}

export const getStockLevels = async () => {
  const stockLevels = await StockLevels.find({
    order: {
      id: "DESC",
    },
  });

  return stockLevels;
};

export const addStockLevel = async (
    date: string,
    stock: string, 
    quantity: number,
    remaining: number,
    stockType: number
) => {
  const stockLevelToAdd = await StockLevels.insert({
    date,
    stock,
    quantity,
    stockType,
    remaining
  });
  return stockLevelToAdd;
};

export const getStockLevelById = async (id: number) => {
  const stockLevelToFindById = await StockLevels.findOne({ where: { id } });
  return stockLevelToFindById;
};

export const updateStockLevel = async (
    id: number,
    date: string,
    stock: string,
    quantity: number,
    remaining: number,
    stockType: number,
    reducedDate: string,
    takenBy: string,
    takenByContacts: string,
    reductions: string,
) => {
    const stockLevelToUpdate =
      await StockLevels.update(id, { 
        date,
        stock,
        quantity,
        remaining,
        stockType,
        reducedDate,
        takenBy,
        takenByContacts,
        reductions 
      });
    return stockLevelToUpdate;
};
  
export const deleteStockLevel = async (id: number) => {
    const stock= await StockLevels.delete(id);
    if (stock) {
      return "Stock Level Deleted";
    }
  };
  
