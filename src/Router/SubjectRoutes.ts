import { Router } from "express";

import {
  fetchSubjects,
  addSubject,
  modifySubject,
  removeSubject,
} from "../Controllers/SubjectsController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const subjectPrefix = "/subjects";
  router.get(`${subjectPrefix}`, JWTAuthMiddleWare, fetchSubjects);
  router.post(`${subjectPrefix}`, JWTAuthMiddleWare, addSubject);
  router.put(`${subjectPrefix}`, JWTAuthMiddleWare, modifySubject);
  router.delete(`${subjectPrefix}/:id`, JWTAuthMiddleWare, removeSubject);
};
