import express from "express";
import { rateLimit } from "express-rate-limit";
import { errorHandling } from "./middlewares/errorHandling";
import { route } from "./routes";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "https://unhas-vf.vercel.app",
  }),
);
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      message:
        "Too many requests from this IP, please try again after 15 minutes.",
    },
  }),
);
app.use(express.json());
app.use(route);
app.use(errorHandling);

export { app };
