import { Router } from "express";
import {
  addDocument,
  addEducation,
  addNextOfKin,
  addWorkExperience,
  getProfile,
  deleteNextOfKinController,
  deleteWorkExperienceController,
  deleteQualificationController,
  removeDocument
} from "../Controllers/StaffProfileController";
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

const document = upload.single("document");

export default (router: Router) => {
  const staffProfilePrefix = "/staff-profile";
  router.post(`${staffProfilePrefix}/document`, document, JWTAuthMiddleWare, addDocument);
  router.post(`${staffProfilePrefix}/education`, JWTAuthMiddleWare, addEducation);
  router.post(`${staffProfilePrefix}/next-of-kin`, JWTAuthMiddleWare, addNextOfKin);
  router.post(`${staffProfilePrefix}/work-experience`, JWTAuthMiddleWare, addWorkExperience);
  router.post(`${staffProfilePrefix}/get-profile`, JWTAuthMiddleWare, getProfile);
  router.delete(`${staffProfilePrefix}/next-of-kin/:id`, JWTAuthMiddleWare, deleteNextOfKinController);
  router.delete(`${staffProfilePrefix}/work-experience/:id`, JWTAuthMiddleWare, deleteWorkExperienceController);
  router.delete(`${staffProfilePrefix}/education/:id`, JWTAuthMiddleWare, deleteQualificationController);
  router.delete(`${staffProfilePrefix}/document/:id`, JWTAuthMiddleWare, removeDocument);
}

