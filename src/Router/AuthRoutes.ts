import { Router } from "express";
import {
  handleLogin,
  getAuthenticatedUser,
  handleLogout,
  passwordResetRequest,
  getCodeForReset,
} from "../Controllers/AuthenticationController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const authPrefix = "/auth";
  router.post(`${authPrefix}/login`, handleLogin);
  router.get(`${authPrefix}/user`, JWTAuthMiddleWare, getAuthenticatedUser);
  router.get(`${authPrefix}/logout`, JWTAuthMiddleWare, handleLogout);
  router.post(`${authPrefix}/reset-password-request`, passwordResetRequest);
  router.post(`${authPrefix}/submit-code`, getCodeForReset);
};
