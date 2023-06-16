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
  transactionId!: string;

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

  @Column(
    {
      nullable: true
    }
  )
  debit!: number;

  @Column(
    {
      nullable: true
    }
  )
  credit!: number;



}


function generateTransactionID() {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e8);
  const transactionID = "TID-"+ uniqueSuffix
  return transactionID
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
  transID: string,
  title: string,
  amount: number,
  description: string,
  transactionCategory: string,
  account: number,
  balance: number,
  debit: number,
  credit: number,
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
  transaction.transactionId = transID;
  transaction.title = title;
  transaction.amount = amount;
  transaction.description = description;
  transaction.transactionType = transactionCategory;
  transaction.account = accountEntity;
  transaction.balance = balance;
  transaction.debit = debit;
  transaction.credit = credit;
  
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

  const transID = generateTransactionID()

  const debitAccountBalance = accountToDebitEntity.amount;
  const creditAccountBalance = accountToCreditEntity.amount;
  
  const debitAccountBalanceAfterTransaction = debitAccountBalance + amount;
  const creditAccountBalanceAfterTransaction = creditAccountBalance - amount;

  // Create Debit Transaction
  const debitTransaction = await createTransaction(
    transID,
    title,
    debitAccountBalance,
    description,
    transactionCategory,
    accountToDebit,
    debitAccountBalanceAfterTransaction,
    amount,
    0,
    receivedBy,
    contacts,
    file,
    receipt,
    transactionTypeID,
  )

  // Create Credit Transaction
  const creditTransaction = await createTransaction(
    transID,
    title,
    creditAccountBalance,
    description,
    transactionCategory,
    accountToCredit,
    creditAccountBalanceAfterTransaction,
    0,
    amount,
    receivedBy,
    contacts,
    file,
    receipt,
    transactionTypeID,
  );

  // Update Accounts
  accountToDebitEntity.amount = debitAccountBalanceAfterTransaction;
  accountToCreditEntity.amount = creditAccountBalanceAfterTransaction;
  await accountToDebitEntity.save();
  await accountToCreditEntity.save();

  return {
    debitTransaction,
    creditTransaction,
  };
}

export const getTransactionsByAccountId = async (accountId: number) => {
  const transactions = await Transaction.find({
    where: {
      account: { id: accountId },
    },
    relations: ["account"],
  });

  return transactions;
};
