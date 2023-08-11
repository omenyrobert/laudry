import { Router } from "express";
import { fetchMarksheets, fetchAllMarksheets } from "../Controllers/MarkSheetController";
import {
  fetchAssessments,
  addAssessment,
  modifyAssessment,
  removeAssessment,
  getAssessmentsByTermController
} from "../Controllers/AssessmentsController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const assessmentPrefix = "/assessments";
  router.get(`${assessmentPrefix}`, JWTAuthMiddleWare, fetchAssessments);
  router.post(`${assessmentPrefix}`, JWTAuthMiddleWare, addAssessment);
  router.put(`${assessmentPrefix}`, JWTAuthMiddleWare, modifyAssessment);
  router.delete(`${assessmentPrefix}/:id`, JWTAuthMiddleWare, removeAssessment);
  router.get(`${assessmentPrefix}/term/:term`, JWTAuthMiddleWare, getAssessmentsByTermController);
  router.post(`/marksheet`, fetchMarksheets);
  router.get(`/marksheet`, fetchAllMarksheets);
};
