import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import fileUpload from "express-fileupload";
import cors from "cors";
import "./models/connection.js";
import messageRouter from "./routes/message.route.js";
import addCourseRouter from "./routes/addcourse.route.js";
import paymentRouter from "./routes/payment.route.js";
import path from "path";
import url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const port = process.env.PORT || 5001;
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  fileUpload({
    createParentPath: false,
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server is running"));
app.use("/api/message", messageRouter);
app.use("/api", addCourseRouter);
app.use("/api/payment", paymentRouter);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", ({ roomId }) => {
    if (!roomId) return;
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on("send-message", (data) => {
    if (!data || !data.roomId) return;

    console.log("message received on server", data);

    setTimeout(() => {
      io.to(data.roomId).emit("receive-message", data);
    }, 50);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
