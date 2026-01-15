import express from "express";

const route = express.Router();

import * as teachercontroller from "../controller";

route.post("/save",teachercontroller.save);
route.get("/fetch",teachercontroller.fetch);
route.post("/login",teachercontroller.login);

export default route;

