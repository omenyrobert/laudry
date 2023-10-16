import { Router } from "express";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";
import {
  createSalesController,
  getSalesByDateController,
  getSalesController
} from "../Controllers/SalesController";


export default (router: Router) => {
  const salesPrefix = "/sales";
  router.get(`${salesPrefix}`, JWTAuthMiddleWare, getSalesController);
  router.post(`${salesPrefix}`, JWTAuthMiddleWare, createSalesController);
  router.get(`${salesPrefix}/by-date`, JWTAuthMiddleWare, getSalesByDateController);
}