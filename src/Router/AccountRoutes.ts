import { Router } from "express";

import {
  fetchAccounts,
  addAccount,
  modifyAccount,
  removeAccount,
} from "../Controllers/AccountsController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const accountPrefix = "/accounts";
  router.get(`${accountPrefix}`, JWTAuthMiddleWare, fetchAccounts);
  router.post(`${accountPrefix}`, JWTAuthMiddleWare, addAccount);
  router.put(`${accountPrefix}`, JWTAuthMiddleWare, modifyAccount);
  router.delete(`${accountPrefix}/:id`, JWTAuthMiddleWare, removeAccount);
};
