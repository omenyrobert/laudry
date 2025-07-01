import { Router } from "express";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";
import {
  payAccountController,
  getAccountsController,
  handleDeletePayment,
  handleUpdatePayment,
} from "../Controllers/AccountsController";
import { withActivityLog } from "../Middlewares/ActivityLoggerMiddleware";

export default (router: Router) => {
  const accountPrefix = "/accounts";
  router.post(
    `${accountPrefix}/pay`,
    JWTAuthMiddleWare,
    withActivityLog("Creating Account", (req) => req.body, payAccountController)
  );
  router.delete(`${accountPrefix}/:id`, handleDeletePayment);
  router.put(`${accountPrefix}`, handleUpdatePayment);
  router.get(`${accountPrefix}`, JWTAuthMiddleWare, getAccountsController);
};
