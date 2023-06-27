import { Router } from "express";

import {
  fetchReports,
  addReport,
  modifyReport,
  removeReport,
} from "../Controllers/ReportsController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const reportPrefix = "/reports";
  router.get(`${reportPrefix}`, JWTAuthMiddleWare, fetchReports);
  router.post(`${reportPrefix}`, JWTAuthMiddleWare, addReport);
  router.put(`${reportPrefix}/:id`, JWTAuthMiddleWare, modifyReport);
  router.delete(`${reportPrefix}/:id`, JWTAuthMiddleWare, removeReport);
};
