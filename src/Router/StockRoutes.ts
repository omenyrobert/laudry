import { Router } from "express";
import {
  fetchStocks,
  modifyStock,
  removeStock,
  addStock,
  handleResctock,
  handleSearchStock,
  handleGetAllStocks,
  handleGetTopStocks
} from "../Controllers/StockController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const stokPrefix = "/stock";
  router.get(`${stokPrefix}`, JWTAuthMiddleWare, fetchStocks);
  router.post(`${stokPrefix}`, JWTAuthMiddleWare, addStock);
  router.put(`${stokPrefix}`, JWTAuthMiddleWare, modifyStock);
  router.delete(`${stokPrefix}/:id`, JWTAuthMiddleWare, removeStock);
  router.post(`${stokPrefix}/restock`, JWTAuthMiddleWare, handleResctock);
  router.get(`${stokPrefix}/search`, JWTAuthMiddleWare, handleSearchStock);
  router.get(`${stokPrefix}/all`, JWTAuthMiddleWare, handleGetAllStocks);
  router.get(`${stokPrefix}/top`, JWTAuthMiddleWare, handleGetTopStocks);
};
