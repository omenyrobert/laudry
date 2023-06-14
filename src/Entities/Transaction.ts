import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity,
  ManyToOne,
  OneToMany,
  CreateDateColumn
} from "typeorm";
import { Account } from "./Account";
import { TransactionType } from "./TransactionType";


@Entity()
export class Transaction extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  date!: Date;

  @Column()
  title!: string;

  @Column()
  amount!: number;

  @Column()
  description!: string;

  @Column({
    nullable: true
  })
  receivedBy!: string;

  @Column({
    nullable: true
  })
  contacts!: string;

  @Column({
    nullable: true
  })
  file!: string;

  @Column({
    nullable: true
  })
  receipt!: string;

  @Column({
    nullable: true
  })
  transactionCategory!: string;


  @ManyToOne(() => TransactionType, transactionType => transactionType.transactions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: true,
    eager: true,
  })
  transactionType!: TransactionType;

  // Account
  @ManyToOne(() => Account, account => account.transactions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: true,
    eager: true,
  })
  account!: Account;

  @Column()
  debit_amount!: number;

  @Column()
  credit_amount!: number;

  @Column()
  balance!: number;


}


export const getTransactions = async () => {
  const transactions = await Transaction.find({
    order: {
      id: "DESC",
    },
  });
  return transactions;
}

export const createTransaction = async (
  title: string,
  amount: number,
  description: string,
  transactionCategory: string,
  account: number,
  debit_amount: number,
  credit_amount: number,
  balance: number,
  receivedBy: string | null = null,
  contacts: string | null = null,
  file: string | null = null,
  receipt: string | null = null,
  transactionTypeID: number | null = null,
) => {
  let transactionType : TransactionType | null = null;
  if (transactionTypeID) {
    transactionType = await TransactionType.findOne({
      where: {
        id: transactionTypeID,
      },
    })
  }

  const accountEntity = await Account.findOne({
    where: {
      id: account,
    },
  })

  if (!accountEntity) {
    throw new Error("Account not found");
  }

  const transaction = new Transaction();
  transaction.title = title;
  transaction.amount = amount;
  transaction.description = description;
  transaction.transactionCategory = transactionCategory;
  transaction.account = accountEntity;
  transaction.debit_amount = debit_amount;
  transaction.credit_amount = credit_amount;
  transaction.balance = balance;
  
  if (transactionType) {
    transaction.transactionType = transactionType;
  }

  if (receivedBy) {
    transaction.receivedBy = receivedBy;
  }

  if (contacts) {
    transaction.contacts = contacts;
  }

  if (file) {
    transaction.file = file;
  }

  if (receipt) {
    transaction.receipt = receipt;
  }

  await transaction.save();
  return transaction;
}

export const deleteTransaction = async (id: number) => {
  const transaction = await Transaction.findOne(
    {where: {id: id}}
  );
  if (!transaction) {
    throw new Error("Transaction not found");
  }
  await transaction.remove();
  return transaction;
}

export const updateTransaction = async (
  id: number,
  title: string,
  amount: number,
  description: string,
  transactionCategory: string,
  account: number,
  debit_amount: number,
  credit_amount: number,
  balance: number,
  receivedBy: string | null = null,
  contacts: string | null = null,
  file: string | null = null,
  receipt: string | null = null,
  transactionTypeID: number | null = null,
) => {
  const transaction = await Transaction.findOne(
    {where: {id: id}}
  );
  if (!transaction) {
    throw new Error("Transaction not found");
  }

  let transactionType : TransactionType | null = null;
  if (transactionTypeID) {
    transactionType = await TransactionType.findOne({
      where: {
        id: transactionTypeID,
      },
    })
  }

  const accountEntity = await Account.findOne({
    where: {
      id: account,
    },
  })

  if (!accountEntity) {
    throw new Error("Account not found");
  }

  transaction.title = title;
  transaction.amount = amount;
  transaction.description = description;
  transaction.transactionCategory = transactionCategory;
  transaction.account = accountEntity;
  transaction.debit_amount = debit_amount;
  transaction.credit_amount = credit_amount;
  transaction.balance = balance;
  
  if (transactionType) {
    transaction.transactionType = transactionType;
  }

  if (receivedBy) {
    transaction.receivedBy = receivedBy;
  }

  if (contacts) {
    transaction.contacts = contacts;
  }

  if (file) {
    transaction.file = file;
  }

  if (receipt) {
    transaction.receipt = receipt;
  }

  await transaction.save();
  return transaction;
}



