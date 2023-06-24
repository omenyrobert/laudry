import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity,
  OneToMany
} from "typeorm";
import { Transaction } from "./Transaction";


@Entity()
export class TransactionType extends BaseEntity  {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @Column()
  name!: string;

  @OneToMany(() => Transaction, transaction => transaction.subType, {
    cascade: true,
    nullable: true,
  })
  transactions!: Transaction[];
}


export type TransactionTypeOBJ =  {
  id?: number;
  type: "income" | "expense" | "bill" | "liability" | "asset" | "equity" | "transfer";
  name: string;
}

export const createTransactionType = async (transactionType: TransactionTypeOBJ) => {
  const transactionTypeEntity = new TransactionType();
  transactionTypeEntity.type = transactionType.type;
  transactionTypeEntity.name = transactionType.name;
  await transactionTypeEntity.save();
  return transactionTypeEntity;
}

export const getTransTypesForSelectType = async (
  type: string
) => {
  const transactionTypes = await TransactionType.find({where: {type: type}});
  return transactionTypes;
}


export const updateTransactionType = async (transactionType: TransactionTypeOBJ) => {
  if (!transactionType.id) {
    throw new Error("Transaction Type ID is required to update a transaction type");
  }
  const transTypeEntity = await TransactionType.findOne(
    {where: {id: transactionType.id}}
  );

  if (!transTypeEntity) {
    throw new Error("Transaction Type ID is required to update a transaction type");
  }

  transTypeEntity.type = transactionType.type;
  transTypeEntity.name = transactionType.name;

  await transTypeEntity.save();
  return transTypeEntity;
}


export const deleteTransactionType = async (id: number) => {
  
  const transTypeEntity = await TransactionType.findOne(
    {where: {id: id}}
  );

  if (!transTypeEntity) {
    throw new Error("Transaction Type ID is required to update a transaction type");
  }

  transTypeEntity.remove();

  return true
}

export const getTransactionTypes = async () => {
  const transactionTypes = await TransactionType.find({
    order: {
      id: "DESC",
    },
  });
  return transactionTypes;
}

