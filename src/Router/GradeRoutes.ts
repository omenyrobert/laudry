import { Router } from "express";

import {
  fetchGrades,
  addGrade,
  modifyGrade,
  removeGrade,
} from "../Controllers/GradesController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const gradePrefix = "/grades";
  router.get(`${gradePrefix}`, JWTAuthMiddleWare, fetchGrades);
  router.post(`${gradePrefix}`, JWTAuthMiddleWare, addGrade);
  router.put(`${gradePrefix}/:id`, JWTAuthMiddleWare, modifyGrade);
  router.delete(`${gradePrefix}/:id`, JWTAuthMiddleWare, removeGrade);
};
