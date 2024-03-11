import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { createServer } from "http";
import { Server } from "socket.io";

import userRouter from "./route/user.js";
import tutorRouter from "./route/tutor.js";
import courseRouter from "./route/course.js";
export const app = express();

const httpServer = createServer(app);

dotenv.config();

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//Socket-server
const io = new Server(httpServer, {
  cors: {
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("user-connected");

  socket.on("chat", (payload) => {
    console.log("What is payload", payload);
    io.emit("chat", payload);
  });
});

httpServer.listen(5000, () => {
  console.log("Http server running on port 5000");
});

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/tutor", tutorRouter);
app.use("/api/v1/course", courseRouter);
app.get("/", (req, res) => {
  res.send("Nice Working");
});
