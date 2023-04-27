import { Router } from "express";
import StreamRoutes from "./StreamRoutes";
import SectionsRoutes from "./SectionsRoutes";

const router = Router();

export default (): Router => {
	StreamRoutes(router);
    SectionsRoutes(router);
    return router;
};
