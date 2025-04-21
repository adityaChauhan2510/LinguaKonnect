import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./route/user.js";
import tutorRouter from "./route/tutor.js";
import courseRouter from "./route/course.js";

export const app = express();

dotenv.config();

// Using Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/tutor", tutorRouter);
app.use("/api/v1/course", courseRouter);

app.get("/", (req, res) => {
  res.send("Nice Working");
});
