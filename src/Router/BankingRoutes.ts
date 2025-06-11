import { Router } from "express";
import {
  fetchBankings,
  handleUpdating,
  removeBanking,
  handleAddBankings,
} from "../Controllers/BankingController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const BankingPrefix = "/bankings";
  router.get(`${BankingPrefix}`, JWTAuthMiddleWare, fetchBankings);
  router.post(`${BankingPrefix}`, JWTAuthMiddleWare, handleAddBankings);
  router.put(`${BankingPrefix}`, JWTAuthMiddleWare, handleUpdating);
  router.delete(`${BankingPrefix}/:id`, JWTAuthMiddleWare, removeBanking);
};
