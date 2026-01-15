import express from "express";
import * as signupController from "../controller/signup.controller.js";
const route = express.Router();

route.post("/status/save", signupController.saveStatus);
route.get("/status/fetch", signupController.fetchStatus);
route.put("/status/update", signupController.updateStatus);
route.delete("/status/:id", signupController.deleteTeacher);
route.post("/status/login", signupController.loginStatus);



export default route;

