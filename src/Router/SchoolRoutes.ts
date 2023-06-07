import { Router } from "express";
import multer from "multer";
import {
  fetchSchools,
  addSchool,
  modifySchool,
  removeSchool,
} from "../Controllers/SchoolsController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/schools");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export default (router: Router) => {
  const schoolPrefix = "/schools";
  router.get(`${schoolPrefix}`, JWTAuthMiddleWare, fetchSchools);
  router.post(`${schoolPrefix}`, JWTAuthMiddleWare, addSchool);
  router.put(`${schoolPrefix}`, JWTAuthMiddleWare, upload.any(), modifySchool);
  router.delete(`${schoolPrefix}/:id`, JWTAuthMiddleWare, removeSchool);
};
