import { Router } from "express";
import { AIController } from "../controllers/AIController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "../middlewares/verifyUserAuthorization";
import { rateLimit } from "express-rate-limit";

const aiRoutes = Router();
const aiController = new AIController();
const aiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message:
      "Too many requests from this IP, please try again after 15 minutes.",
  },
});

aiRoutes.use(ensureAuthenticated);
aiRoutes.use(verifyUserAuthorization(["ADMIN"]));
aiRoutes.get(
  "/generationSubtitle",
  aiRateLimit,
  aiController.generationSubtitle,
);

export { aiRoutes };
