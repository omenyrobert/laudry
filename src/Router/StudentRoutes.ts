import { Router } from "express";
import {
  fetchStudents,
  addStudent,
  editStudent,
  removeStudent,
  fetchSingleStudent,
  updateStudentPhotoController,
  removeStudentDocument,
  addStudentDocument,
  fetchStudentDocuments,
  searchingStudents,
  fetchNumberOfStudents,
  fetchStudentsWithFeesBalanceLessThan50Controller
} from "../Controllers/StudentController";
import {validateStudentRequest} from "../Middlewares/StudentMiddleware";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "useruploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const profilePictureUpload = upload.single("photo");

export default (router: Router) => {
  const studentRoutePrefix = "/students";
  router.get(`${studentRoutePrefix}`, JWTAuthMiddleWare, fetchStudents);
  router.get(`${studentRoutePrefix}/:id`, JWTAuthMiddleWare, fetchSingleStudent);
  router.post(`${studentRoutePrefix}`, JWTAuthMiddleWare, validateStudentRequest, addStudent);
  router.put(`${studentRoutePrefix}/edit`, JWTAuthMiddleWare, profilePictureUpload, validateStudentRequest, editStudent);
  router.delete(`${studentRoutePrefix}/:id`, JWTAuthMiddleWare, removeStudent);
  router.put(`${studentRoutePrefix}/photo/:id`, JWTAuthMiddleWare, profilePictureUpload, updateStudentPhotoController);
  router.post(`${studentRoutePrefix}/document`, JWTAuthMiddleWare, upload.single("document"), addStudentDocument);
  router.get(`${studentRoutePrefix}/documents/:student`, JWTAuthMiddleWare, fetchStudentDocuments);
  router.delete(`${studentRoutePrefix}/document/delete/:id`, JWTAuthMiddleWare, removeStudentDocument);
  router.get(`/search${studentRoutePrefix}`, JWTAuthMiddleWare, searchingStudents);
  router.get(`${studentRoutePrefix}/studentCount/count`, JWTAuthMiddleWare, fetchNumberOfStudents);
  router.get(`${studentRoutePrefix}/balance/lessThan50`, JWTAuthMiddleWare, fetchStudentsWithFeesBalanceLessThan50Controller);

};
