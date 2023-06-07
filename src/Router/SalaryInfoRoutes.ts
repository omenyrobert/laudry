import { Router } from "express";
import {
  fetchSalaryInfo,
  fetchSalaryInfoById,
  addSalaryInfo,
  modifySalaryInfo,
  removeSalaryInfo,
} from "../Controllers/SalaryInfoController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const salaryInfoRoutePrefix = "/salary-info";
  router.get(`${salaryInfoRoutePrefix}`, JWTAuthMiddleWare, fetchSalaryInfo);
  router.get(`${salaryInfoRoutePrefix}/:id`, JWTAuthMiddleWare, fetchSalaryInfoById);
  router.post(`${salaryInfoRoutePrefix}`, JWTAuthMiddleWare, addSalaryInfo);
  router.put(`${salaryInfoRoutePrefix}/:id`, JWTAuthMiddleWare, modifySalaryInfo);
  router.delete(`${salaryInfoRoutePrefix}/:id`, JWTAuthMiddleWare, removeSalaryInfo);
}
