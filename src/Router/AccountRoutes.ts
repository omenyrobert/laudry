import { Router } from "express";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";
import { payAccountController, getAccountsController } from "../Controllers/AccountsController";
import { withActivityLog } from "../Middlewares/ActivityLoggerMiddleware";


export default (router: Router) => {
  const accountPrefix = "/accounts";
  router.post(`${accountPrefix}/pay`, JWTAuthMiddleWare, withActivityLog("Creating Account", (req) => req.body, payAccountController) );
  router.get(`${accountPrefix}`, JWTAuthMiddleWare, getAccountsController);
}