import { Router } from "express";

import {
  fetchStaffTypes,
  modifyStaffType,
  removeStaffType,
  createStaffType,
} from "../Controllers/StaffTypesController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const staffTypePrefix = "/staffTypes";
  router.get(`${staffTypePrefix}`, JWTAuthMiddleWare, fetchStaffTypes);
  router.post(`${staffTypePrefix}`, JWTAuthMiddleWare, createStaffType);
  router.put(`${staffTypePrefix}`, JWTAuthMiddleWare, modifyStaffType);
  router.delete(`${staffTypePrefix}/:id`, JWTAuthMiddleWare, removeStaffType);
};
