import { Router } from "express";

import {
  fetchMembers,
  createStaffMember,
  removeStaffMember,
  modifyStaffMember,
  passwordUpdate,
  fetchStaffById
} from "../Controllers/StaffController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const staffPrefix = "/staff";
  router.get(`${staffPrefix}`, JWTAuthMiddleWare, fetchMembers);
  router.post(`${staffPrefix}`, JWTAuthMiddleWare, createStaffMember);
  router.put(`${staffPrefix}`, JWTAuthMiddleWare, modifyStaffMember);
  router.delete(`${staffPrefix}/:id`, JWTAuthMiddleWare, removeStaffMember);
  router.post(`${staffPrefix}/reset-password`, passwordUpdate);
  router.get(`${staffPrefix}/:id`, JWTAuthMiddleWare, fetchStaffById);
};
