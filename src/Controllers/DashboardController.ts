import { Request, Response } from "express";
import { getOrders } from "../Entities/Order";
import { Expense } from "../Entities/Expense";
import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchCardsStats = async (req: Request, res: Response) => {
  try {
    // 1. Get all orders (with items relation)
    const orders = await getOrders();

    // 2. Split paid vs pending
    const paidOrders = orders.filter((order) => order.orderStatus === "paid");
    const pendingOrders = orders.filter(
      (order) => order.orderStatus === "pending"
    );

    // 3. Totals for amounts
    const totalPaidAmount = paidOrders.reduce(
      (total, order) => total + (order.paid || 0),
      0
    );

    // Unpaid portion of pending orders
    const totalPendingAmount = pendingOrders.reduce(
      (total, order) => total + ((order.amount || 0) - (order.paid || 0)),
      0
    );

    const totalOrders = orders.length;
    const totalPaidOrders = paidOrders.length;
    const totalPendingOrders = pendingOrders.length;

    // 4. Expenses: last 7 days
    const today = new Date();
    const sevenDaysAgo = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );

    const expenses = await Expense.find();

    const totalExpenseThisWeek = expenses.reduce((total, expense) => {
      const expenseDate =
        expense.date instanceof Date ? expense.date : new Date(expense.date);
      if (expenseDate >= sevenDaysAgo && expenseDate <= today) {
        return total + (expense.amount || 0);
      }
      return total;
    }, 0);

    // 5. Top 10 expenses (by amount, descending)
    const topExpenses = expenses
      .sort((a, b) => (b.amount || 0) - (a.amount || 0))
      .slice(0, 10);

    // 6. Aggregate order items for charts
    // orderItems: all items with total qty per item
    const itemTotalsMap: Record<
      number,
      {
        itemId: number;
        itemName: string;
        totalQty: number;
      }
    > = {};

    for (const order of orders) {
      for (const oi of order.items || []) {
        if (!oi.itemId) continue; // safety guard
        const key = oi.itemId;
        if (!itemTotalsMap[key]) {
          itemTotalsMap[key] = {
            itemId: oi.itemId,
            itemName: oi.item?.name || `Item ${oi.itemId}`,
            totalQty: 0,
          };
        }
        itemTotalsMap[key].totalQty += oi.quantity || 0;
      }
    }

    const orderItems = Object.values(itemTotalsMap).sort(
      (a, b) => b.totalQty - a.totalQty
    );

    // Top 10 most ordered items
    const mostOrderItems = orderItems.slice(0, 10);

    // 7. Build stats object for cards / graphs
    const stats = {
      pendingOrders,
      paidOrders,
      totalOrders,
      totalPaidOrders,
      totalPendingOrders,
      totalPaidAmount,
      totalPendingAmount,
      totalExpenseThisWeek,
      topExpenses,
      orderItems,      // all items with totalQty
      mostOrderItems,  // top 10 items by totalQty
    };

    return res
      .status(200)
      .json(customPayloadResponse(true, stats))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(customPayloadResponse(false, "Failed to fetch card stats"))
      .end();
  }
};
