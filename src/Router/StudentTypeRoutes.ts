import { Router } from "express";
import {
  fetchStudentTypes,
  addStudentTypeController,
  deleteStudentTypeController,
  updateStudentTypeController,
} from "../Controllers/StudentTypesController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const studentTypeRoutePrefix = "/student-types";
  router.get(`${studentTypeRoutePrefix}`, JWTAuthMiddleWare, fetchStudentTypes);
  router.post(`${studentTypeRoutePrefix}`, JWTAuthMiddleWare, addStudentTypeController);
  router.delete(`${studentTypeRoutePrefix}/:id`, JWTAuthMiddleWare, deleteStudentTypeController);
  router.put(`${studentTypeRoutePrefix}/:id`, JWTAuthMiddleWare, updateStudentTypeController);
}
