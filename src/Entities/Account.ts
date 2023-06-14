import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity, 
  In ,
  OneToMany,
} from "typeorm";
import { Transaction } from "./Transaction";

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  accountName!: string;

  @Column()
  accountType!: string;

  @Column()
  subType!: string;

  @Column({ nullable: true })
  amount!: number;

  @OneToMany(() => Transaction, transaction => transaction.account, {
    cascade: true,
    nullable: true,
  })
  transactions!: Transaction[];
}

export const getAccounts = async () => {
  const accounts = await Account.find({
    order: {
      id: "DESC",
    },
  });
  return accounts;
};

export const createAccount = async (
  accountName: string,
  accountType: string,
  subType: string,
  amount: number,
) => {
  const accountToInsert = await Account.insert({
    accountName,
    accountType,
    subType,
    amount,
  });

  return accountToInsert;
};

export const deleteAccount = async (id: number) => {
  const account = await Account.delete(id);
  if (account) {
    return "Account Deleted";
  }
};

export const updateAccount = async (
  id: number,
  accountName: string,
  accountType: string,
  subType: string,
  amount: number,
) => {
  const accountToUpdate = await Account.update(id, {
    accountName,
    accountType,
    subType,
    amount,
  });
  return accountToUpdate;
};

export const getSingleAccount = async (id: number) => {
    const account = await Account.findOne({ where: { id: id } }) as Account;
    return account;
};

export const getSelectedAccounts = async (ids: number[]) => {
  const selectedAccounts = await Account.find({ where: { id: In(ids) } });
  return selectedAccounts;
};

