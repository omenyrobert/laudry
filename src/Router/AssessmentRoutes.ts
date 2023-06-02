import { Router } from "express";

import {
  fetchAssessments,
  addAssessment,
  modifyAssessment,
  removeAssessment,
} from "../Controllers/AssessmentsController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const assessmentPrefix = "/assessments";
  router.get(`${assessmentPrefix}`, JWTAuthMiddleWare, fetchAssessments);
  router.post(`${assessmentPrefix}`, JWTAuthMiddleWare, addAssessment);
  router.put(`${assessmentPrefix}`, JWTAuthMiddleWare, modifyAssessment);
  router.delete(`${assessmentPrefix}/:id`, JWTAuthMiddleWare, removeAssessment);
};
