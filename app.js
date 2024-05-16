import express from "express";
import cors from "cors";
import 'dotenv/config';
import authRouter from "./routes/auth.routes.js";

import { createServer } from "http";
const app = express();
const httpServer = createServer(app);

const corsOptions = {
origin: [process.env.CORS_ORIGIN, process.env.CORS_ORIGIN2],
credentials: true,
};
// global middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure static file to save images locally

app.use("/api/auth", authRouter);

export { httpServer };