import { Router } from "express";

import {
  fetchReports,
  addReport,
  modifyReport,
  removeReport,
} from "../Controllers/ReportsController";

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

// uploader middleware from multiple files
const uploader = upload.any();

export default (router: Router) => {
  const reportPrefix = "/reports";
  router.get(`${reportPrefix}`, JWTAuthMiddleWare, fetchReports);
  router.post(`${reportPrefix}`, uploader, JWTAuthMiddleWare, addReport);
  router.put(`${reportPrefix}/:id`, JWTAuthMiddleWare, modifyReport);
  router.delete(`${reportPrefix}/:id`, JWTAuthMiddleWare, removeReport);
};
