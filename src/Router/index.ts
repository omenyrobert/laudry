import { Router } from "express";
import StreamRoutes from "./StreamRoutes";
import StaffTypeRoutes from "./StaffTypeRoutes";
import StaffRoutes from "./StaffRoutes";
import AuthRoutes from "./AuthRoutes";
import SectionRoutes from "./SectionRoutes";
import ClassRoutes from "./ClassRoutes";
import FeeRoutes from "./FeeRoutes";
import SubjectRoutes from "./SubjectRoutes";
import TermRoutes from "./TermRoutes";
import StudentRoutes from "./StudentRoutes";
import StudentTypeRoutes from "./StudentTypeRoutes";
import HouseRoutes from "./HouseRoutes";

const router = Router();

export default (): Router => {
  StreamRoutes(router);
  StaffTypeRoutes(router);
  StaffRoutes(router);
  AuthRoutes(router);
  SectionRoutes(router);
  ClassRoutes(router);
  FeeRoutes(router);
  SubjectRoutes(router);
  TermRoutes(router);
  StudentRoutes(router);
  StudentTypeRoutes(router);
  HouseRoutes(router);
  return router;
};
