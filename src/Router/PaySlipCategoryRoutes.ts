import { Router } from "express";
import {
  fetchPaySlipCategories,
  createPaySlipCategoryController,
  deletePaySlipCategoryController,
  updatePaySlipCategoryController,
} from "../Controllers/PaySlipCategoryController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const paySlipCategoryRoutePrefix = "/pay-slip-categories";
  router.get(`${paySlipCategoryRoutePrefix}`, JWTAuthMiddleWare, fetchPaySlipCategories);
  router.post(`${paySlipCategoryRoutePrefix}`, JWTAuthMiddleWare, createPaySlipCategoryController);
  router.delete(`${paySlipCategoryRoutePrefix}/:id`, JWTAuthMiddleWare, deletePaySlipCategoryController);
  router.put(`${paySlipCategoryRoutePrefix}/:id`, JWTAuthMiddleWare, updatePaySlipCategoryController);
}
