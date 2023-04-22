import { Router } from "express";
import StreamRoutes from "./StreamRoutes";

const router = Router();

export default (): Router => {
	StreamRoutes(router);
    return router;
};
