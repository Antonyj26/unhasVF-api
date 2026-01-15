import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "../middlewares/verifyUserAuthorization";

const userController = new UserController();
export const userRoutes = Router();
userRoutes.use(ensureAuthenticated);
userRoutes.use(verifyUserAuthorization(["ADMIN"]));

userRoutes.post("/create", userController.create);
