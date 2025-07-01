import { Router } from "express";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";
import {
  createSalesController,
  getSalesByDateController,
  getSalesController,
  searchSalesController,
  getSalesAndExpensesController,
  handleDeleteSale,
  handleGetStockHistory,
} from "../Controllers/SalesController";
import { withActivityLog } from "../Middlewares/ActivityLoggerMiddleware";

export default (router: Router) => {
  const salesPrefix = "/sales";
  router.get(`${salesPrefix}`, JWTAuthMiddleWare, getSalesController);
    router.get(`${salesPrefix}/stock`, JWTAuthMiddleWare, handleGetStockHistory);
  router.post(
    `${salesPrefix}`,
    JWTAuthMiddleWare,
    withActivityLog("Making sales", (req) => req.body, createSalesController)
  );
  router.get(
    `${salesPrefix}/by-date`,
    JWTAuthMiddleWare,
    getSalesByDateController
  );
  router.get(`${salesPrefix}/search`, JWTAuthMiddleWare, searchSalesController);
  router.post(
    `${salesPrefix}/:id`,
    JWTAuthMiddleWare,
    withActivityLog("Deleted a Sale", (req) => req.body, handleDeleteSale)
  );
  router.get(
    `${salesPrefix}/bank-report`,
    JWTAuthMiddleWare,
    getSalesAndExpensesController
  );
};
