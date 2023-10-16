import { Router } from "express";
import {
  fetchExpenses,
  modifyExpense,
  removeExpense,
  addExpenses,
} from "../Controllers/ExpensesController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const expensePrefix = "/expenses";
  router.get(`${expensePrefix}`, JWTAuthMiddleWare, fetchExpenses);
  router.post(`${expensePrefix}`, JWTAuthMiddleWare, addExpenses);
  router.put(`${expensePrefix}`, JWTAuthMiddleWare, modifyExpense);
  router.delete(`${expensePrefix}/:id`, JWTAuthMiddleWare, removeExpense);
};
