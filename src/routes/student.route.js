import express from "express";

const route = express.Router();

import * as studentcontroller from "../controller/student.controller";
    

route.post("/status/save", studentcontroller.saveStatus);
route.get("/status/fetch", studentcontroller.fetchStatus);
route.put("/status/update", studentcontroller.updateStatus);
route.delete("/status/:id", studentcontroller.deleteStudent);
route.post("/status/login", studentcontroller.loginStatus);


export default route;

