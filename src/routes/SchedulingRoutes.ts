import { Router } from "express";
import { SchedulingController } from "../controllers/SchedulingController";
import { verifyUserAuthorization } from "../middlewares/verifyUserAuthorization";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const schedulingRoutes = Router();
const schedulingController = new SchedulingController();

schedulingRoutes.use(ensureAuthenticated);
schedulingRoutes.use(verifyUserAuthorization(["ADMIN"]));

schedulingRoutes.post("/create", schedulingController.create);
schedulingRoutes.get("/index", schedulingController.index);
schedulingRoutes.patch("/update/:schedulingId", schedulingController.update);
schedulingRoutes.delete("/delete/:schedulingId", schedulingController.delete);
