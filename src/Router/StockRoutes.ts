import { Router } from "express";
import {
  fetchStocks,
  modifyStock,
  removeStock,
  addStock,
  handleResctock,
  handleSearchStock,
  handleGetAllStocks,
  handleGetTopStocks,
} from "../Controllers/StockController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";
import { withActivityLog } from "../Middlewares/ActivityLoggerMiddleware";

export default (router: Router) => {
  const stokPrefix = "/stock";
  router.get(`${stokPrefix}`, JWTAuthMiddleWare, fetchStocks);
  router.post(
    `${stokPrefix}`,
    JWTAuthMiddleWare,
    withActivityLog("Add stock", (req) => req.body, addStock)
  );
  router.put(
    `${stokPrefix}`,
    JWTAuthMiddleWare,
    withActivityLog("Updated stock", (req) => req.body, modifyStock)
  );
  router.post(
    `${stokPrefix}/:id`,
    JWTAuthMiddleWare,
    withActivityLog("Deleted stock", (req) => req.body, removeStock)
  );
  router.post(
    `${stokPrefix}/restock`,
    JWTAuthMiddleWare,
    withActivityLog("Restocking", (req) => req.body, handleResctock)
  );
  router.get(`${stokPrefix}/search`, JWTAuthMiddleWare, handleSearchStock);
  router.get(`${stokPrefix}/all`, JWTAuthMiddleWare, handleGetAllStocks);
  router.get(`${stokPrefix}/top`, JWTAuthMiddleWare, handleGetTopStocks);
};
