import { Router } from "express";

import {
  fetchStaffTypes,
  modifyStaffType,
  removeStaffType,
  createStaffType,
} from "../Controllers/StaffTypesController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";
import { withActivityLog } from "../Middlewares/ActivityLoggerMiddleware";

export default (router: Router) => {
  const staffTypePrefix = "/staffTypes";
  router.get(`${staffTypePrefix}`, JWTAuthMiddleWare, fetchStaffTypes);
  router.post(`${staffTypePrefix}`, JWTAuthMiddleWare,withActivityLog("Creating Account", (req) => req.body, createStaffType));
  router.put(`${staffTypePrefix}`, JWTAuthMiddleWare,withActivityLog("Creating Account", (req) => req.body, modifyStaffType));
  router.post(`${staffTypePrefix}/:id`, JWTAuthMiddleWare, withActivityLog("Deleted Staff Types", (req) => req.body, removeStaffType) );
};
