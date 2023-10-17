import { Router } from "express";
import StaffTypeRoutes from "./StaffTypeRoutes";
import StaffRoutes from "./StaffRoutes";
import AuthRoutes from "./AuthRoutes";
import CategoriesRoutes from "./CategoriesRoutes";
import StockRoutes from "./StockRoutes";
import ExpensesRoutes from "./ExpensesRoutes";
import SalesRoutes from "./SalesRoutes";
import CustomerRoutes from "./CustomerRoutes";
import AccountRoutes from "./AccountRoutes";

const router = Router();

export default (): Router => {
  StaffTypeRoutes(router);
  StaffRoutes(router);
  AuthRoutes(router);
  CategoriesRoutes(router);
  StockRoutes(router);
  ExpensesRoutes(router);
  SalesRoutes(router);
  CustomerRoutes(router);
  AccountRoutes(router);
  return router;
};
