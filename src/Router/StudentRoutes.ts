import { Router } from "express";
import {
  fetchStudents,
  addStudent,
  editStudent,
  removeStudent,
  fetchSingleStudent,
} from "../Controllers/StudentController";
import {validateStudentRequest} from "../Middlewares/StudentMiddleware";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";


export default (router: Router) => {
  const studentRoutePrefix = "/students";
  router.get(`${studentRoutePrefix}`, JWTAuthMiddleWare, fetchStudents);
  router.get(`${studentRoutePrefix}/:id`, JWTAuthMiddleWare, fetchSingleStudent);
  router.post(`${studentRoutePrefix}`, JWTAuthMiddleWare, validateStudentRequest, addStudent);
  router.put(`${studentRoutePrefix}/edit`, JWTAuthMiddleWare, validateStudentRequest, editStudent);
  router.delete(`${studentRoutePrefix}/:id`, JWTAuthMiddleWare, removeStudent);
};
