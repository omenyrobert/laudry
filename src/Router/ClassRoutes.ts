import { Router } from "express";
import {
  fetchClasses,
  addClass,
  modifyClass,
  removeClass,
} from "../Controllers/ClassController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const classPrefix = "/class";
  router.get(`${classPrefix}`, JWTAuthMiddleWare, fetchClasses);
  router.post(`${classPrefix}`, JWTAuthMiddleWare, addClass);
  router.put(`${classPrefix}`, JWTAuthMiddleWare, modifyClass);
  router.delete(`${classPrefix}/:id`, JWTAuthMiddleWare, removeClass);
};
