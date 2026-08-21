import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import admissionRouter from "./admission";
import chatRouter from "./chat";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(admissionRouter);
router.use(chatRouter);

export default router;
