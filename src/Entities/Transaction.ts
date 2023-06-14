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

  @Column( {
    nullable: true
  })
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
  transactionType!: string;


  @ManyToOne(() => TransactionType, transactionType => transactionType.transactions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: true,
    eager: true,
  })
  subType!: TransactionType;

  // Account
  @ManyToOne(() => Account, account => account.transactions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: true,
    eager: true,
  })
  account!: Account;


  @Column({
    nullable: true
  })
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

export const createTransaction = async (
  title: string,
  amount: number,
  description: string,
  transactionCategory: string,
  account: number,
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
  transaction.transactionType = transactionCategory;
  transaction.account = accountEntity;
  transaction.balance = balance;
  
  if (transactionType) {
    transaction.subType = transactionType;
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

export const updateTransaction = async (
  id: number,
  title: string,
  amount: number,
  description: string,
  transactionCategory: string,
  account: number,
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
  transaction.transactionType = transactionCategory;
  transaction.account = accountEntity;
  transaction.balance = balance;
  
  if (transactionType) {
    transaction.subType = transactionType;
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



export const createTransactionDoubleEntry = async (
  title: string,
  amount: number,
  description: string,
  transactionCategory: string,
  accountToDebit: number,
  accountToCredit: number,
  receivedBy: string | null = null,
  contacts: string | null = null,
  file: string | null = null,
  receipt: string | null = null,
  transactionTypeID: number | null = null,
) => {
  // Get Accounts
  const accountToDebitEntity = await Account.findOne({
    where: {
      id: accountToDebit,
    },
  })

  const accountToCreditEntity = await Account.findOne({
    where: {
      id: accountToCredit,
    },
  })

  if (!accountToDebitEntity) {
    throw new Error("Account to debit not found");
  }

  if (!accountToCreditEntity) {
    throw new Error("Account to credit not found");
  }

  // Create Debit Transaction
  const debitTransaction = await createTransaction(
    title,
    amount,
    description,
    transactionCategory,
    accountToDebit,
    accountToDebitEntity.amount - amount,
    receivedBy,
    contacts,
    file,
    receipt,
    transactionTypeID,
  );

  // Create Credit Transaction
  const creditTransaction = await createTransaction(
    title,
    amount,
    description,
    transactionCategory,
    accountToCredit,
    accountToCreditEntity.amount + amount,
    receivedBy,
    contacts,
    file,
    receipt,
    transactionTypeID,
  );

  // Update Accounts
  accountToDebitEntity.amount = accountToDebitEntity.amount - amount;
  accountToCreditEntity.amount = accountToCreditEntity.amount + amount;
  await accountToDebitEntity.save();
  await accountToCreditEntity.save();

  return {
    debitTransaction,
    creditTransaction,
  };
}