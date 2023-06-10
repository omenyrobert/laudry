import { Router } from "express";
import {
  addDocument,
  addEducation,
  addNextOfKin,
  addWorkExperience,
  getProfile
} from "../Controllers/StaffProfileController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const staffProfilePrefix = "/staff-profile";
  router.post(`${staffProfilePrefix}/document`, JWTAuthMiddleWare, addDocument);
  router.post(`${staffProfilePrefix}/education`, JWTAuthMiddleWare, addEducation);
  router.post(`${staffProfilePrefix}/next-of-kin`, JWTAuthMiddleWare, addNextOfKin);
  router.post(`${staffProfilePrefix}/work-experience`, JWTAuthMiddleWare, addWorkExperience);
  router.post(`${staffProfilePrefix}/get-profile`, JWTAuthMiddleWare, getProfile);
}

