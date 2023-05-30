import { Router } from "express";
import {
  fetchFees,
  addFee,
  modifyFee,
  removeFee,
  fetchSingleFee,
} from "../Controllers/FeesController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const feesRoutePrefix = "/fees";
  router.get(`${feesRoutePrefix}`, JWTAuthMiddleWare, fetchFees);
  router.get(`${feesRoutePrefix}/:id`, JWTAuthMiddleWare, fetchSingleFee);
  router.post(`${feesRoutePrefix}`, JWTAuthMiddleWare, addFee);
  router.put(`${feesRoutePrefix}`, JWTAuthMiddleWare, modifyFee);
  router.delete(`${feesRoutePrefix}/:id`, JWTAuthMiddleWare, removeFee);
};
