import { Router } from "express";

import {
  fetchDivisions,
  addDivision,
  modifyDivision,
  removeDivision,
} from "../Controllers/DivisionsController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const divisionPrefix = "/divisions";
  router.get(`${divisionPrefix}`, JWTAuthMiddleWare, fetchDivisions);
  router.post(`${divisionPrefix}`, JWTAuthMiddleWare, addDivision);
  router.put(`${divisionPrefix}`, JWTAuthMiddleWare, modifyDivision);
  router.delete(`${divisionPrefix}/:id`, JWTAuthMiddleWare, removeDivision);
};
