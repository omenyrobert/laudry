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
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/students");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });



export default (router: Router) => {
  const studentRoutePrefix = "/students";
  router.get(`${studentRoutePrefix}`, JWTAuthMiddleWare, fetchStudents);
  router.get(`${studentRoutePrefix}/:id`, JWTAuthMiddleWare, fetchSingleStudent);
  router.post(`${studentRoutePrefix}`, JWTAuthMiddleWare, validateStudentRequest, addStudent);
  router.put(`${studentRoutePrefix}/edit`, JWTAuthMiddleWare, upload.any(), validateStudentRequest, editStudent);
  router.delete(`${studentRoutePrefix}/:id`, JWTAuthMiddleWare, removeStudent);
};
