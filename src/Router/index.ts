import { Router } from "express";
import StreamRoutes from "./StreamRoutes";
import StaffTypeRoutes from "./StaffTypeRoutes";
import StaffRoutes from "./StaffRoutes";
import AuthRoutes from "./AuthRoutes";
import SectionRoutes from "./SectionRoutes";

const router = Router();

export default (): Router => {
  StreamRoutes(router);
  StaffTypeRoutes(router);
  StaffRoutes(router);
  AuthRoutes(router);
  SectionRoutes(router);
  return router;
};
