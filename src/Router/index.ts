import { Router } from "express";
import StreamRoutes from "./StreamRoutes";
import StaffTypeRoutes from "./StaffTypeRoutes";
import StaffRoutes from "./StaffRoutes";
import AuthRoutes from "./AuthRoutes";
import SectionRoutes from "./SectionRoutes";
import ClassRoutes from "./ClassRoutes";
<<<<<<< HEAD
import FeeRoutes from "./FeeRoutes";
=======
import SubjectRoutes from "./SubjectRoutes";
>>>>>>> 09d4c691bd2d062ca1b24fca64bfa3fcbbb0584f

const router = Router();

export default (): Router => {
  StreamRoutes(router);
  StaffTypeRoutes(router);
  StaffRoutes(router);
  AuthRoutes(router);
  SectionRoutes(router);
  ClassRoutes(router);
<<<<<<< HEAD
  FeeRoutes(router);
=======
  SubjectRoutes(router);
>>>>>>> 09d4c691bd2d062ca1b24fca64bfa3fcbbb0584f
  return router;
};
