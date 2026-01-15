import { Router } from "express";
import { userRoutes } from "./UserRoutes";
import { sessionRoute } from "./SessionRoute";
import { clientRoutes } from "./ClientRoutes";
import { schedulingRoutes } from "./SchedulingRoutes";

export const route = Router();

route.use("/user", userRoutes);
route.use("/session", sessionRoute);
route.use("/client", clientRoutes);
route.use("/scheduling", schedulingRoutes);
