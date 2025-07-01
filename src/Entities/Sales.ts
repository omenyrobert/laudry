import {startOfDay, endOfDay} from "date-fns";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  In,
  ManyToOne,
  Between,
  OneToOne,
  CreateDateColumn,
  Like
} from "typeorm";
import { Stock } from "./Stock";
import { Customer } from "./Customer";
import { Account } from "./Account";
import { getExpensesByDate, searchExpenses } from "./Expense";



@Entity()
export class Sales extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column()
  quantity!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({
    default: true,
  })
  paid!: boolean;

  @ManyToOne(() => Stock, (stock) => stock.sales, {
    onDelete: "CASCADE",
    eager: true,
  })
  stock!: Stock;

  @ManyToOne(() => Customer, (customer) => customer.sales, {
    onDelete: "CASCADE",
    eager: true,
  })
  customer!: Customer;

  @OneToOne(() => Account, (account) => account.sales, {
    onDelete: "CASCADE",
    nullable: true,
  })
  account!: Account;

}


export const createSale = async (
  date: string,
  quantity: number,
  stockId: number,
  customerId: number | null = null,
  paymentDate: string | null = null,
) => {
  const stock = await Stock.findOne({
    where: {
      id: stockId,
    },
  });

  let customer = null 
  if (customerId) {
    customer = await Customer.findOne({
      where: {
        id: customerId,
      },
    });
  }

  if (!stock) {
    throw new Error("Stock not found");
  }

  const sales = new Sales();
  sales.date = new Date(date);
  sales.quantity = quantity;
  sales.stock = stock;
  
  if (customer) {
    sales.customer = customer;
    sales.paid = false;
    if (paymentDate) {
      sales.date = new Date(paymentDate);
    }
  }


  await sales.save();

  stock.qty -= quantity;
  await stock.save();

  if (customer) {
    const account = new Account();
    account.amount = stock.unitSell * quantity;
    account.balance = account.amount;
    account.customer = customer;
    

    if (paymentDate) {
      account.date = new Date(paymentDate);
    }
    
    await account.save();

    sales.account = account;
    await sales.save();
  }

  return sales;
}


export const getSales = async (
  page = 1,
) => {
  const sales = await Sales.find({
    order: {
      id: "DESC",
    },
    take: 30 * page,
  });
  return sales;
}

export const getSalesByDate = async (
  date: string,
) => {
  const validDate = new Date(date);

  if (isNaN(validDate.getTime())) {
    throw new Error("Invalid Date");
  }
  
  const sales = await Sales.find({
    where: {
      date: Between(startOfDay(validDate), endOfDay(validDate))
    },
    order: {
      id: "DESC",
    },
  });
  return sales;
}


export const searchSales = async (
  stockName: string | null = null,
  startDate: string | null = null,
  endDate: string | null = null,
) => {
  const where: any = {};

  if (stockName !== null && stockName !== "") {
    where.stock = {
      name: Like(`%${stockName}%`)
    }
  }

  if (startDate !== null && endDate !== null && startDate !== "" && endDate !== "") {
    where.createdAt = Between(new Date(startDate), new Date(endDate));
  } else if (startDate !== null && startDate !== "") {
    where.createdAt = Between(new Date(startDate), new Date());
  } else if (endDate !== null && endDate !== "") {
    where.createdAt = Between(new Date(0), new Date(endDate));
  } else {
    where.createdAt = Between(new Date(0), new Date());
  }

  const sales = await Sales.find({
    where,
    order: {
      id: "DESC",
    },
  });
  return sales;
}


// A function that returns the sales and expenses form start date to end date and grouped by date
export const getSalesAndExpenses = async (
  startDate: string | null = null,
  endDate: string | null = null,
) => {
  const where: any = {};


  if (startDate !== null && endDate !== null && startDate !== "" && endDate !== "") {
    where.createdAt = Between(new Date(startDate), new Date(endDate));
  } else if (startDate !== null && startDate !== "") {
    where.createdAt = Between(new Date(startDate), new Date());
  } else if (endDate !== null && endDate !== "") {
    where.createdAt = Between(new Date(0), new Date(endDate));
  } else {
    where.createdAt = Between(new Date(0), new Date());
  }

  const sales = await Sales.find({
    where,
    order: {
      id: "DESC",
    },
  });

  let dates = new Set();
  sales.forEach((sale) => {
    dates.add(sale.createdAt.toDateString().slice(0,10));
  });

  const expenses = await searchExpenses(null, startDate, endDate);
  
  expenses.forEach((expense) => {
    dates.add(expense.date.toDateString().slice(0,10));
  });

  const result: any = [];
  dates.forEach((date) => {
    const salesTotal = sales.reduce((acc, sale) => {
      if (sale.createdAt.toDateString().slice(0,10) === date) {
        return acc + sale.stock.unitSell * sale.quantity;
      }
      return acc;
    }, 0);

    const expensesTotal = expenses.reduce((acc, expense) => {
      if (expense.date.toDateString().slice(0,10) === date) {
        return acc + expense.amount;
      }
      return acc;
    }, 0);

    const unpaidSales = sales.reduce((acc, sale) => {
      if (sale.createdAt.toDateString().slice(0,10) === date && !sale.paid) {
        return acc + sale.stock.unitSell * sale.quantity;
      }
      return acc;
    } , 0);

    result.push({
      date,
      sales: salesTotal,
      expenses: expensesTotal,
      profit: salesTotal - expensesTotal,
      unpaidSales,
    });
  });

  return result;
}

export const deleteSale = async (saleId: number) => {
  const sale = await Sales.findOne({
    where: { id: saleId },
    relations: ["stock", "account"], // Ensures stock and account are loaded
  });

  if (!sale) {
    throw new Error("Sale not found");
  }

  // Restore the stock quantity when a sale is deleted
  if (sale.stock) {
    sale.stock.qty += sale.quantity;
    await sale.stock.save();
  }

  // If there is an account linked, delete it
  if (sale.account) {
    await sale.account.remove();
  }

  await sale.remove();
  return { message: "Sale deleted successfully" };
};

export const getStockSalesHistory = async ()=> {
  const stocks = await Stock.find({ relations: ["sales"] });

  const result = stocks.map((stock) => {
    let currentBalance = stock.qty;
    const sortedSales = stock.sales.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const salesHistory = sortedSales.map((sale) => {
      const record = {
        stockName: stock.name,
        soldAt: sale.date,
        quantitySold: sale.quantity,
        balanceBefore: currentBalance,
        balanceAfter: currentBalance - sale.quantity,
      };

      // Update balance for next iteration
      currentBalance -= sale.quantity;

      return record;
    });

    return {
      stockId: stock.id,
      stockName: stock.name,
      history: salesHistory,
    };
  });

  return result;
}
