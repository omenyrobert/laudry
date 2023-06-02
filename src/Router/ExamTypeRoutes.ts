import { Router } from "express";
import {
  fetchExamTypes,
  addExamType,
  modifyExamType,
  removeExamType,
  fetchSingleExamType,
} from "../Controllers/ExamTypesController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const examTypesRoutePrefix = "/exam-types";
  router.get(`${examTypesRoutePrefix}`, JWTAuthMiddleWare, fetchExamTypes);
  router.get(`${examTypesRoutePrefix}/:id`, JWTAuthMiddleWare, fetchSingleExamType);
  router.post(`${examTypesRoutePrefix}`, JWTAuthMiddleWare, addExamType);
  router.put(`${examTypesRoutePrefix}`, JWTAuthMiddleWare, modifyExamType);
  router.delete(`${examTypesRoutePrefix}/:id`, JWTAuthMiddleWare, removeExamType);
};
