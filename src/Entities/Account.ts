import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn
} from "typeorm";
import { Customer } from "./Customer";
import { Sales } from "./Sales";
import { Payment } from "./Payment";

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  balance!: number;


  @Column()
  date!: Date;

  @Column()
  amount!: number;

  @OneToOne(() => Sales, (sales) => sales.account, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  sales!: Sales;


  @ManyToOne(() => Customer, (customer) => customer.accounts, {
    onDelete: "CASCADE",
  })
  customer!: Customer;

  @OneToMany(() => Payment, (payment) => payment.account, {
    onDelete: "CASCADE",
    eager: true,
  })
  payments!: Payment[];

}


export const createAccount = async (
  date: string,
  amount: number,
  customerId: number,
  salesId: number,
) => {

  const customer = await Customer.findOne({
    where: {
      id: customerId,
    },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  const sale = await Sales.findOne({
    where: {
      id: salesId,
    },
  });

  if (!sale) {
    throw new Error("Sale not found");
  }


  const account = new Account();
  account.date = new Date(date);
  account.amount = amount;
  account.balance = amount;
  account.customer = customer;
  account.sales = sale;
  account.save();

  return account;
}


export const payAccount = async (
  id: number,
  amount: number,
  date: string,
) => {
  const account = await Account.findOne({
    where: {
      id,
    },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  const balance = account.balance - amount;

  if (balance < 0) {
    throw new Error("Amount is greater than balance");
  }

  account.balance = balance;
  account.save();

  const payment = new Payment();
  payment.amount = amount;
  payment.date = new Date(date);
  payment.account = account;
  payment.balance = balance;
  payment.save();
}

export const getAccounts = async () => {
  const accounts = await Account.find({
    order: {
      id: "DESC",
    },
    relations: ["customer"],
  });
  return accounts;
}