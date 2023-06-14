import { Router } from "express";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";
import {
  addTransactionType,
  getTransactionTypes,
  updateTransactionTypeController,
  deleteTransactionTypeController,
  getTransactionTypesController
} from "../Controllers/TransactionTypeController";

export default (router: Router) => {
  const transactionRoutePrefix = "/transaction-types";
  router.post(`${transactionRoutePrefix}`, JWTAuthMiddleWare, addTransactionType);
  router.get(`${transactionRoutePrefix}/:type`, JWTAuthMiddleWare, getTransactionTypes);
  router.put(`${transactionRoutePrefix}`, JWTAuthMiddleWare, updateTransactionTypeController);
  router.delete(`${transactionRoutePrefix}/:id`, JWTAuthMiddleWare, deleteTransactionTypeController);
  router.get(`${transactionRoutePrefix}`, JWTAuthMiddleWare, getTransactionTypesController);
};