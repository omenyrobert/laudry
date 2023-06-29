import { Router } from "express";
import {
  fetchStockTypes,
  modifyStockType,
  removeStockType,
  createStockType,
} from "../Controllers/StockTypesController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const stockTypePrefix = "/stockTypes";
  router.get(`${stockTypePrefix}`, JWTAuthMiddleWare, fetchStockTypes);
  router.post(`${stockTypePrefix}`, JWTAuthMiddleWare, createStockType);
  router.put(`${stockTypePrefix}`, JWTAuthMiddleWare, modifyStockType);
  router.delete(`${stockTypePrefix}/:id`, JWTAuthMiddleWare, removeStockType);
};
