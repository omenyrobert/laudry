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

  // Account balance before transaction
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
  invoice!: string;

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


  // Account balance after transaction
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

  @Column({
    nullable: true
  })
  receipt_number!: string;

  @OneToMany(() => Item, item => item.transaction, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: true,
    eager: true,
  })
  items!: Item[];

  @Column({
    nullable: true
  })
  status!: string;


  @Column({
    nullable: true
  })
  invoice_balance!: number;

  @Column({
    nullable: true
  })
  transactionDate!: Date;

}


@Entity()
export class Item extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column()
  quantity!: number;

  @ManyToOne(() => Transaction, transaction => transaction.items, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: true,
    //eager: true,
  })
  transaction!: Transaction;

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

type ItemType = {
  name: string,
  price: number,
  quantity: number,
}

const generateRandomReceiptNumber = () => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e8);
  const receiptNumber = "RPT-"+ uniqueSuffix
  return receiptNumber
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
  invoice: string | null = null,
  transactionTypeID: number | null = null,
  items: ItemType[] | null = null,
  status: string | null = null,
  transactionDate: string | null = null,
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

  if (transactionDate) {
    transaction.transactionDate = new Date(transactionDate);
  }
  
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

  if (invoice) {
    transaction.invoice = invoice;
  }

  
  

  if (transactionCategory === "invoice" || transactionCategory === "receipt") {
    transaction.receipt_number = generateRandomReceiptNumber();
  }

  if (status) {
    transaction.status = status;
  }


  await transaction.save();


    if (items) {
      let invoice_balance = 0;
      for (const item of items) {
        const newItem = new Item();
        newItem.name = item.name;
        newItem.price = item.price;
        newItem.quantity = item.quantity;
        newItem.transaction = transaction;
        await newItem.save();
        invoice_balance += item.price * item.quantity;
      }
      transaction.invoice_balance = invoice_balance;
      await transaction.save();
    }




  return transaction;
}



export type AmountType= {
  debit: number,
  credit: number,
} | number


export const createTransactionDoubleEntry = async (
  title: string,
  amount: AmountType,
  description: string,
  transactionCategory: string,
  accountToDebit: number,
  accountToCredit: number,
  receivedBy: string | null = null,
  contacts: string | null = null,
  file: string | null = null,
  receipt: string | null = null,
  invoice: string | null = null,
  transactionTypeID: number | null = null,
  items: ItemType[] | null = null,
  status: string | null = null,
  transactionDate: string | null = null,
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

  let amountToDebit = 0;
  let amountToCredit = 0;

  if (typeof amount === "number") {
    amountToDebit = amount;
    amountToCredit = amount;
  } else {
    amountToDebit = amount.debit;
    amountToCredit = amount.credit;
  }

  const transID = generateTransactionID()

  const debitAccountBalance = accountToDebitEntity.amount;
  const creditAccountBalance = accountToCreditEntity.amount;
  
  const debitAccountBalanceAfterTransaction = debitAccountBalance + amountToDebit;
  const creditAccountBalanceAfterTransaction = creditAccountBalance - amountToCredit;

  // Create Debit Transaction
  const debitTransaction = await createTransaction(
    transID,
    title,
    debitAccountBalance,
    description,
    transactionCategory,
    accountToDebit,
    debitAccountBalanceAfterTransaction,
    amountToDebit,
    0,
    receivedBy,
    contacts,
    file,
    receipt,
    invoice,
    transactionTypeID,
    items,
    status,
    transactionDate
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
    amountToCredit,
    receivedBy,
    contacts,
    file,
    receipt,
    invoice,
    transactionTypeID,
    items,
    status,
    transactionDate
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

export const updateTransaction = async (
  id: number,
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
  invoice: string | null = null,
  transactionTypeID: number | null = null,
  items: ItemType[] | null = null,
  status: string | null = null,
  transactionDate: string | null = null,
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

  if (invoice) {
    transaction.invoice = invoice;
  }

  if (transactionDate) {
    transaction.transactionDate = new Date(transactionDate);
  }

  if (items) {
    let invoice_balance = 0;
    for (const item of items) {
      const newItem = new Item();
      newItem.name = item.name;
      newItem.price = item.price;
      newItem.quantity = item.quantity;
      newItem.transaction = transaction;
      await newItem.save();
      invoice_balance += item.price * item.quantity;
    }
    transaction.invoice_balance = invoice_balance;
  }


  if (status) {
    transaction.status = status;
  }


  await transaction.save();
  return transaction;
}


// A function that updates a transaction with double entry
export const updateTransactionDoubleEntry = async (
  transId: string,
  title: string,
  amount: AmountType,
  description: string,
  transactionCategory: string,
  accountToDebit: number,
  accountToCredit: number,
  receivedBy: string | null = null,
  contacts: string | null = null,
  file: string | null = null,
  receipt: string | null = null,
  invoice: string | null = null,
  transactionTypeID: number | null = null,
  items: ItemType[] | null = null,
  status: string | null = null,
  transactionDate: string | null = null,
) => {
  

  // Get Both Transactions with the same transaction ID
  const transactions = await Transaction.find({
    where: {
      transactionId: transId,
    },
  });

  if (transactions.length !== 2) {
    throw new Error("Transaction not found");
  }

  const transactionsObj: {
    debitTransaction: Transaction | null,
    creditTransaction: Transaction | null,
  } = {
    debitTransaction: null,
    creditTransaction: null,
  }

  for (const transaction of transactions) {
    if (transaction.debit === 0) {
      transactionsObj.creditTransaction = transaction;
    } else if (transaction.credit === 0) {
      transactionsObj.debitTransaction = transaction;
    }
  }

  if (!transactionsObj.creditTransaction || !transactionsObj.debitTransaction) {
    throw new Error("Transaction not found");
  }

  // Get old accounts
  const oldAccountToDebitEntity = transactionsObj.debitTransaction.account;
  const oldAccountToCreditEntity = transactionsObj.creditTransaction.account;

  if (!oldAccountToDebitEntity || !oldAccountToCreditEntity) {
    throw new Error("Transaction not found");
  }

  // Get old balances
  const oldDebitAccountBalance = transactionsObj.debitTransaction.debit;
  const oldCreditAccountBalance = transactionsObj.creditTransaction.credit;

  // Restore old balances
  oldAccountToDebitEntity.amount -= oldDebitAccountBalance;
  oldAccountToCreditEntity.amount += oldCreditAccountBalance;

  // Update old accounts
  await oldAccountToDebitEntity.save();
  await oldAccountToCreditEntity.save();

  // Get new accounts
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

  // Get new balances
  const debitAccountBalance = accountToDebitEntity.amount;
  const creditAccountBalance = accountToCreditEntity.amount;

  let amountToDebit = 0;
  let amountToCredit = 0;

  if (typeof amount === "number") {
    amountToDebit = amount;
    amountToCredit = amount;
  } else {
    amountToDebit = amount.debit;
    amountToCredit = amount.credit;
  }

  // Update new balances
  const debitAccountBalanceAfterTransaction = debitAccountBalance + amountToDebit;
  const creditAccountBalanceAfterTransaction = creditAccountBalance - amountToCredit;

  // Update new accounts
  accountToDebitEntity.amount = debitAccountBalanceAfterTransaction;
  accountToCreditEntity.amount = creditAccountBalanceAfterTransaction;

  // Save new accounts
  await accountToDebitEntity.save();
  await accountToCreditEntity.save();

  // Update debit transaction
  const debitTransaction = await updateTransaction(
    transactionsObj.debitTransaction.id,
    title,
    debitAccountBalance,
    description,
    transactionCategory,
    accountToDebit,
    debitAccountBalanceAfterTransaction,
    amountToDebit,
    0,
    receivedBy,
    contacts,
    file,
    receipt,
    invoice,
    transactionTypeID,
    items,
    status,
    transactionDate
  )

  // Update credit transaction
  const creditTransaction = await updateTransaction(
    transactionsObj.creditTransaction.id,
    title,
    creditAccountBalance,
    description,
    transactionCategory,
    accountToCredit,
    creditAccountBalanceAfterTransaction,
    0,
    amountToCredit,
    receivedBy,
    contacts,
    file,
    receipt,
    invoice,
    transactionTypeID,
    items,
    status,
    transactionDate
  )

  return {
    debitTransaction,
    creditTransaction,
  };

}


export const getTransaction = async (id: number) => {
  const transaction = await Transaction.findOne(
    {where: {id: id}}
  );
  if (!transaction) {
    throw new Error("Transaction not found");
  }
  return transaction;
}


export const deleteTransactionDoubleEntry = async (
  transID: string
) => {
  // Get Both Transactions with the same transaction ID
  const transactions = await Transaction.find({
    where: {
      transactionId: transID,
    },
  });

  if (transactions.length !== 2) {
    throw new Error("Transaction not found");
  }

  const transactionsObj: {
    debitTransaction: Transaction | null,
    creditTransaction: Transaction | null,
  } = {
    debitTransaction: null,
    creditTransaction: null,
  }

  for (const transaction of transactions) {
    if (transaction.debit === 0) {
      transactionsObj.creditTransaction = transaction;
    } else if (transaction.credit === 0) {
      transactionsObj.debitTransaction = transaction;
    }
  }

  if (!transactionsObj.creditTransaction || !transactionsObj.debitTransaction) {
    throw new Error("Transaction not found");
  }

  // Get old accounts
  const oldAccountToDebitEntity = transactionsObj.debitTransaction.account;
  const oldAccountToCreditEntity = transactionsObj.creditTransaction.account;

  if (!oldAccountToDebitEntity || !oldAccountToCreditEntity) {
    throw new Error("Transaction not found");
  }

  // Get debited and credited amounts
  const debitedAmount = transactionsObj.debitTransaction.debit;
  const creditedAmount = transactionsObj.creditTransaction.credit;

  // Restore amounts to creditAccount and debitAccount
  oldAccountToDebitEntity.amount -= debitedAmount;
  oldAccountToCreditEntity.amount += creditedAmount;

  // Save old accounts
  await oldAccountToDebitEntity.save();
  await oldAccountToCreditEntity.save();

  for (const transaction of transactions) {
    // delete transaction
    await transaction.remove();
  }

  return "Transaction deleted successfully"
}


export const getTransactionsByTransId = async (
  transId: string
) => {
  // Get Both Transactions with the same transaction ID
  const transactions = await Transaction.find({
    where: {
      transactionId: transId,
    },
  });

  if (transactions.length !== 2) {
    throw new Error("Transaction not found");
  }

  const transactionsObj: {
    debitTransaction: Transaction | null,
    creditTransaction: Transaction | null,
  } = {
    debitTransaction: null,
    creditTransaction: null,
  }

  for (const transaction of transactions) {
    if (transaction.debit === 0) {
      transactionsObj.creditTransaction = transaction;
    } else if (transaction.credit === 0) {
      transactionsObj.debitTransaction = transaction;
    }
  }

  if (!transactionsObj.creditTransaction || !transactionsObj.debitTransaction) {
    throw new Error("Transaction not found");
  }

  return transactionsObj;
}

export const getTransactionsByTransactionType = async (
  transactionType: string
) => {
  // order from latest to oldest
  const transactions = await Transaction.find({
    where: {
      transactionType: transactionType,
    },
    order: {
      id: "DESC",
    },
  });
  return transactions;
}
