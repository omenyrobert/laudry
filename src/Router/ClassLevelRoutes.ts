import { Router } from "express";

import { getLevels } from "../Controllers/ClassLevelController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const levelPrefix = "/class-levels";
  router.get(`${levelPrefix}`, JWTAuthMiddleWare, getLevels);
};
