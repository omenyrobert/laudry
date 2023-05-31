import { Router } from "express";

import {
  fetchTerms,
  modifyTerm,
  removeTerm,
  addTerm,
} from "../Controllers/TermsController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const termPrefix = "/terms";
  router.get(`${termPrefix}`, JWTAuthMiddleWare, fetchTerms);
  router.post(`${termPrefix}`, JWTAuthMiddleWare, addTerm);
  router.put(`${termPrefix}/:id`, JWTAuthMiddleWare, modifyTerm);
  router.delete(`${termPrefix}/:id`, JWTAuthMiddleWare, removeTerm);
};
