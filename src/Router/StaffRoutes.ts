import { Router } from "express";

import {
  fetchMembers,
  createStaffMember,
  removeStaffMember,
  modifyStaffMember,
  passwordUpdate,
  fetchStaffById,
  updateStaffProfile,
  updateStaffProfilePicture,
} from "../Controllers/StaffController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

import multer from "multer";
import { withActivityLog } from "../Middlewares/ActivityLoggerMiddleware";

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
  router.post(
    `${staffPrefix}`,
    JWTAuthMiddleWare,
    withActivityLog("Creating System User", (req) => req.body, createStaffMember)
  );
  router.put(
    `${staffPrefix}`,
    JWTAuthMiddleWare,
    withActivityLog("Creating Account", (req) => req.body, modifyStaffMember)
  );
  router.delete(
    `${staffPrefix}/:id`,
    JWTAuthMiddleWare,
    withActivityLog("Creating Account", (req) => req.body, removeStaffMember)
  );
  router.post(
    `${staffPrefix}/reset-password`,
    withActivityLog("Creating Account", (req) => req.body, passwordUpdate)
  );
  router.get(`${staffPrefix}/:id`, JWTAuthMiddleWare, fetchStaffById);
  router.put(
    `${staffPrefix}/profile/:id`,
    JWTAuthMiddleWare,
    withActivityLog("Creating Account", (req) => req.body, updateStaffProfile)
  );
  router.post(
    `${staffPrefix}/profile-picture/:id`,
    profilePictureUpload,
    JWTAuthMiddleWare,
    withActivityLog(
      "Creating Account",
      (req) => req.body,
      updateStaffProfilePicture
    )
  );
};
