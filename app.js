import express from "express";
import cors from "cors";
import 'dotenv/config';
import authRouter from "./routes/auth.routes.js";
import uploadRouter from "./routes/upload.routes.js";
import customerRouter from "./routes/customer.routes.js";
import eventRouter from "./routes/event.routes.js";

// import { createServer } from "http";
const app = express();
// const httpServer = createServer(app);

// List of allowed origins
const allowedOrigins = [
    "http://localhost:3000",
    "https://jagota-food-festival.mjcodes.dev",
    "https://jagota-food-festival-dev.pages.dev"
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200 // For legacy browser support
};

// Apply CORS middleware
app.use(cors(corsOptions));

// const corsOptions = {
//     origin: [process.env.CORS_ORIGIN, process.env.CORS_ORIGIN2, process.env.CORS_ORIGIN3],
//     credentials: true,
// };
// console.log("CORS_ORIGIN: ", process.env.CORS_ORIGIN, process.env.CORS_ORIGIN2, process.env.CORS_ORIGIN3);
// // global middlewares
// app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure static file to save images locally

app.use("/api/auth", authRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/customers", customerRouter);
app.use("/api/events", eventRouter);

export { app };