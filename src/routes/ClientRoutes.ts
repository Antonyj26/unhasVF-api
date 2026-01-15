import { ClientController } from "../controllers/ClientController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "../middlewares/verifyUserAuthorization";

const clientController = new ClientController();
export const clientRoutes = Router();

clientRoutes.use(ensureAuthenticated);
clientRoutes.use(verifyUserAuthorization(["ADMIN"]));

clientRoutes.post("/create", clientController.create);
clientRoutes.get("/index", clientController.index);
clientRoutes.get("/show/:clientId", clientController.show);
clientRoutes.delete("/delete/:clientId", clientController.delete);
clientRoutes.patch("/update/:clientId", clientController.update);
