import express from "express";
import cors from "cors";
import 'dotenv/config';
import authRouter from "./routes/auth.routes.js";
import uploadRouter from "./routes/upload.routes.js";
import customerRouter from "./routes/customer.routes.js";
import eventRouter from "./routes/event.routes.js";

import { createServer } from "http";
const app = express();
const httpServer = createServer(app);

const corsOptions = {
origin: [process.env.CORS_ORIGIN3, process.env.CORS_ORIGIN2, process.env.CORS_ORIGIN ],
credentials: true,
};
console.log("CORS_ORIGIN: all", process.env.CORS_ORIGIN, process.env.CORS_ORIGIN2, process.env.CORS_ORIGIN3);
// global middlewares
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure static file to save images locally

app.use("/api/auth", authRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/customers", customerRouter);
app.use("/api/events", eventRouter);

export { httpServer };