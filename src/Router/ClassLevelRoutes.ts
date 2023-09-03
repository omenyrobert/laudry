import { Router } from "express";

import { getLevels, addLevel, deleteLevelById, updateLevelById } from "../Controllers/ClassLevelController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const levelPrefix = "/class-levels";
  router.get(`${levelPrefix}`, JWTAuthMiddleWare, getLevels);
  router.post(`${levelPrefix}`, JWTAuthMiddleWare, addLevel);
  router.put(`${levelPrefix}`, JWTAuthMiddleWare, updateLevelById);
  router.delete(`${levelPrefix}/:id`, JWTAuthMiddleWare, deleteLevelById);
};
