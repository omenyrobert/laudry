import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Fee extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  name!: string;

  @Column()
  amount!: number;

}

export const getFees = async () => {
  const fees = await Fee.find({
    order: {
      id: "DESC",
    },
  });
  return fees;
}

export const createFee = async (name: string, amount: number) => {
  const FeeToInsert = await Fee.insert({ name: name, amount: amount });
  return FeeToInsert;
}

export const deleteFee = async (id: number) => {
  const fee = await Fee.delete(id);
  if (fee) {
    return "Fee Deleted";
  }
}

export const updateFee = async (id: number, name: string, amount: number) => {
  const FeeToUpdate = await Fee.update(id, { name: name, amount: amount });
  return FeeToUpdate;
}

export const getSingleFee = async (id: number) => {
  const fee = await Fee.findOne({ where: { id: id } });
  return fee;
}



