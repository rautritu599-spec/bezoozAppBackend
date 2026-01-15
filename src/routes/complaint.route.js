import express from "express";
import {createComplaint,getStudentComplaints,getAllComplaints,updateComplaint} from "../controller/complaint.controller.js";

const route = express.Router();

// Student side
route.post("/create", createComplaint);
route.get("/student/:id", getStudentComplaints);

// Admin side
route.get("/all", getAllComplaints);
route.put("/update/:id", updateComplaint);

export default route;
