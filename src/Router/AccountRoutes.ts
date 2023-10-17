import { Router } from "express";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";
import { payAccountController, getAccountsController } from "../Controllers/AccountsController";


export default (router: Router) => {
  const accountPrefix = "/accounts";
  router.post(`${accountPrefix}/pay`, JWTAuthMiddleWare, payAccountController);
  router.get(`${accountPrefix}`, JWTAuthMiddleWare, getAccountsController);
}