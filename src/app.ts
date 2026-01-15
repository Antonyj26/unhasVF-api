import express from "express";
import { errorHandling } from "./middlewares/errorHandling";
import { route } from "./routes";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "https://seu-front.vercel.app",
  })
);
app.use(express.json());
app.use(route);
app.use(errorHandling);

export { app };
