import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Reductions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: string;

  @Column()
  stock!: string;

  @Column()
  stockId!: number;

  @Column()
  quantity!: number;

  @Column({nullable: true})
  quantityTaken!: number;

  @Column({nullable: true})
  takenBy!: string;

  @Column({nullable: true})
  takenByContacts!: string;

  @Column({nullable: true})
  balance!: number;
}

export const getReductions = async () => {
  const reductions = await Reductions.find({
    order: {
      id: "DESC",
    },
  });

  return reductions;
};

export const addReductions = async (
    date: string,
    stock: string, 
    stockId: number,
    quantity: number,
    quantityTaken: number,
    takenBy: string,
    takenByContacts: string,
    balance: number,
) => {
  const reductionsToAdd = await Reductions.insert({
    date,
    stock,
    stockId,
    quantity,
    quantityTaken,
    takenBy,
    takenByContacts,
    balance
  });
  return reductionsToAdd;
};

export const getReductionsById = async (id: number) => {
  const reductionsToFindById = await Reductions.findOne({ where: { id } });
  return reductionsToFindById;
};

export const updateReductions = async (
  id: number,
  date: string,
  stock: string, 
  stockId: number,
  quantity: number,
  quantityTaken: number,
  takenBy: string,
  takenByContacts: string,
  balance: number
) => {
    const reductionsToUpdate =
      await Reductions.update(id, { date, stock, stockId, quantity, quantityTaken, takenBy, takenByContacts, balance });
    return reductionsToUpdate;
};
  
export const deleteReductions = async (id: number) => {
    const reduction = await Reductions.delete(id);
    if (reduction) {
      return "Reductions Deleted";
    }
  };
  
