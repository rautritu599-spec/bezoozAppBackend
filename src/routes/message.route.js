import express from "express";
import { deleteMessage, fetchMessages, saveMessage, getUnreadCount } from "../controller/message.controller.js";

const route = express.Router();

route.post("/message", saveMessage);
route.get("/fetch", fetchMessages);
route.delete("/delete/:messageId", deleteMessage);

// ---------------- New route for unread count ----------------
route.get("/unread-count", getUnreadCount);

export default route;
