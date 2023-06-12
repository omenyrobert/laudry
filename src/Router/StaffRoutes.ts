import { Router } from "express";

import {
  fetchMembers,
  createStaffMember,
  removeStaffMember,
  modifyStaffMember,
  passwordUpdate,
  fetchStaffById,
  updateStaffProfile,
  updateStaffProfilePicture
} from "../Controllers/StaffController";
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

const profilePictureUpload = upload.single("profile_picture");

export default (router: Router) => {
  const staffPrefix = "/staff";
  router.get(`${staffPrefix}`, JWTAuthMiddleWare, fetchMembers);
  router.post(`${staffPrefix}`, JWTAuthMiddleWare, createStaffMember);
  router.put(`${staffPrefix}`, JWTAuthMiddleWare, modifyStaffMember);
  router.delete(`${staffPrefix}/:id`, JWTAuthMiddleWare, removeStaffMember);
  router.post(`${staffPrefix}/reset-password`, passwordUpdate);
  router.get(`${staffPrefix}/:id`, JWTAuthMiddleWare, fetchStaffById);
  router.put(`${staffPrefix}/profile/:id`, JWTAuthMiddleWare, updateStaffProfile);
  router.post(`${staffPrefix}/profile-picture/:id`, profilePictureUpload, JWTAuthMiddleWare,  updateStaffProfilePicture);
};
