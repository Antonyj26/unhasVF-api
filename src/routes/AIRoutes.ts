import { Router } from "express";
import { AIController } from "../controllers/AIController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "../middlewares/verifyUserAuthorization";

const aiRoutes = Router();
const aiController = new AIController();

aiRoutes.use(ensureAuthenticated);
aiRoutes.use(verifyUserAuthorization(["ADMIN"]));
aiRoutes.get("/generationSubtitle", aiController.generationSubtitle);

export { aiRoutes };
