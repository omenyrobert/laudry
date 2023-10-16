
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
export class Expense extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: string;

  @Column()
  amount!: number;

  @Column()
  expense!: string;

  @Column()
  receivedBy!: string;

  @Column()
  type!: string;
}

export const getExpenses = async () => {
  const expenses = await Expense.find({
    order: {
      id: "DESC",
    },
    take: 20,
  });
  return expenses;
};

export const createExpense = async (
  date: string,
  amount: number,
  expense: string,
  receivedBy: string,
  type: string,
) => {
  const expenseToInsert = await Expense.insert({
    date,
    amount,
    expense,
    receivedBy,
    type,
  });
  return expenseToInsert;
};

export const deleteExpense = async (id: number) => {
  const expense = await Expense.delete(id);
  if (expense) {
    return "Expense Deleted";
  }
};

export const updateExpense = async (
  id: number,
  date: string,
  amount: number,
  expense: string,
  receivedBy: string,
  type: string,
) => {
  const expenseUpdate = await Expense.update(id, {
    date: date,
    amount: amount,
    expense: expense,
    receivedBy: receivedBy,
    type: type,
  });
  return expenseUpdate;
};

export const getSingleExpense = async (id: number) => {
  const expense = await Expense.findOne({ where: { id: id } });
  return expense;
};

