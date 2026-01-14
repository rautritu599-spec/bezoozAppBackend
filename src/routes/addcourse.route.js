import express from "express";
import {addCourse,getCourses,updateCourse,deleteCourse} from "../controller/addcourse.controller.js";

const router = express.Router();

// ADMIN
router.post("/admin/course", addCourse);
router.put("/admin/course/:id", updateCourse);
router.delete("/admin/course/:id", deleteCourse);

// TEACHER + STUDENT (READ ONLY)
router.get("/course", getCourses);

export default router;
