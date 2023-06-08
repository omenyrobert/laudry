import { Router } from "express";
import {
  fetchPaySlips,
  addPaySlip,
  removePaySlip,
  editPaySlip
} from "../Controllers/PaySlipController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const paySlipPrefix = "/pay-slip";
  router.get(`${paySlipPrefix}`, JWTAuthMiddleWare, fetchPaySlips);
  router.post(`${paySlipPrefix}`, JWTAuthMiddleWare, addPaySlip);
  router.delete(`${paySlipPrefix}/:id`, JWTAuthMiddleWare, removePaySlip);
  router.put(`${paySlipPrefix}/:id`, JWTAuthMiddleWare, editPaySlip);
}
