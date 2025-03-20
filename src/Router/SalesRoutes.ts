import { Router } from "express";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";
import {
  createSalesController,
  getSalesByDateController,
  getSalesController,
  searchSalesController,
  getSalesAndExpensesController,
  handleDeleteSale
} from "../Controllers/SalesController";


export default (router: Router) => {
  const salesPrefix = "/sales";
  router.get(`${salesPrefix}`, JWTAuthMiddleWare, getSalesController);
  router.post(`${salesPrefix}`, JWTAuthMiddleWare, createSalesController);
  router.get(`${salesPrefix}/by-date`, JWTAuthMiddleWare, getSalesByDateController);
  router.get(`${salesPrefix}/search`, JWTAuthMiddleWare, searchSalesController);
  router.delete(`${salesPrefix}/:id`, JWTAuthMiddleWare, handleDeleteSale);
  router.get(`${salesPrefix}/bank-report`, JWTAuthMiddleWare, getSalesAndExpensesController);
}