import { Router } from "express";
import {
  createPayment,
  studentInstallments,
} from "../Controllers/StudentPaymentController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const feePaymentPrefix = "/fee-payment";
  router.post(`${feePaymentPrefix}/add`, JWTAuthMiddleWare, createPayment);
  router.post(
    `${feePaymentPrefix}/student`,
    JWTAuthMiddleWare,
    studentInstallments
  );
};
