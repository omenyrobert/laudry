import { Router } from "express";
import {
  fetchStockLevels,
  createStockLevel,
  modifyStockLevel,
  removeStockLevel
} from "../Controllers/StockLevelsController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const stockLevelsRoutePrefix = "/stock-levels";
  router.get(`${stockLevelsRoutePrefix}`, JWTAuthMiddleWare, fetchStockLevels);
  router.post(`${stockLevelsRoutePrefix}`, JWTAuthMiddleWare, createStockLevel);
  router.put(`${stockLevelsRoutePrefix}`, JWTAuthMiddleWare, modifyStockLevel);
  router.delete(`${stockLevelsRoutePrefix}/:id`, JWTAuthMiddleWare, removeStockLevel);
};
