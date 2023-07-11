import { Router } from "express";
import {
  fetchClasses,
  addClass,
  modifyClass,
  removeClass,
  addClassToStaffController,
  removeClassFromStaffController,
  getNumberOfStudentsPerClassController
} from "../Controllers/ClassController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const classPrefix = "/class";
  router.get(`${classPrefix}`, JWTAuthMiddleWare, fetchClasses);
  router.post(`${classPrefix}`, JWTAuthMiddleWare, addClass);
  router.put(`${classPrefix}`, JWTAuthMiddleWare, modifyClass);
  router.delete(`${classPrefix}/:id`, JWTAuthMiddleWare, removeClass);
  router.post(
    `${classPrefix}/add-class-to-staff`,
    JWTAuthMiddleWare,
    addClassToStaffController
  );
  router.post( 
    `${classPrefix}/remove-class-from-staff`,
    JWTAuthMiddleWare,
    removeClassFromStaffController
  );
  router.get(
    `${classPrefix}/number-of-students-per-class`,
    JWTAuthMiddleWare,
    getNumberOfStudentsPerClassController
  );
};
