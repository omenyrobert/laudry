import { Router } from "express";

import {
  fetchSections,
  addSection,
  removeSection,
  modifySection,
} from "../Controllers/SectionsController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const sectionPrefix = "/sections";
  router.get(`${sectionPrefix}`, JWTAuthMiddleWare, fetchSections);
  router.post(`${sectionPrefix}`, JWTAuthMiddleWare, addSection);
  router.put(`${sectionPrefix}`, JWTAuthMiddleWare, modifySection);
  router.delete(`${sectionPrefix}/:id`, JWTAuthMiddleWare, removeSection);
};
