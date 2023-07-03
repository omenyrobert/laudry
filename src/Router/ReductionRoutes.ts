import { Router } from "express";

import {
  fetchReductions,
  addReduction,
  updateReduction,
  removeReduction,
} from "../Controllers/ReductionsController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {    
  const reductionPrefix = "/reductions";
  router.get(`${reductionPrefix}`, JWTAuthMiddleWare, fetchReductions);
  router.post(`${reductionPrefix}`, JWTAuthMiddleWare, addReduction);
  router.put(`${reductionPrefix}/:id`, JWTAuthMiddleWare, updateReduction);
  router.delete(`${reductionPrefix}/:id`, JWTAuthMiddleWare, removeReduction);
};
