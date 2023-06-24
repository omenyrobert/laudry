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
  destination: "useruploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const schoolPictureUpload = upload.single("logo");

export default (router: Router) => {
  const schoolPrefix = "/schools";
  router.get(`${schoolPrefix}`, JWTAuthMiddleWare, fetchSchools);
  router.post(`${schoolPrefix}`, JWTAuthMiddleWare, addSchool);
  router.put(`${schoolPrefix}`, JWTAuthMiddleWare, schoolPictureUpload, modifySchool);
  router.delete(`${schoolPrefix}/:id`, JWTAuthMiddleWare, removeSchool);
};
