import { Router } from "express";
import {
  fetchStocks,
  modifyStock,
  removeStock,
  addStock,
} from "../Controllers/StockController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const stokPrefix = "/stock";
  router.get(`${stokPrefix}`, JWTAuthMiddleWare, fetchStocks);
  router.post(`${stokPrefix}`, JWTAuthMiddleWare, addStock);
  router.put(`${stokPrefix}`, JWTAuthMiddleWare, modifyStock);
  router.delete(`${stokPrefix}/:id`, JWTAuthMiddleWare, removeStock);
};
