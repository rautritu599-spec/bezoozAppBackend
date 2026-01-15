import Complaint from "../models/complaint.model.js";
import '../models/connection.js'

// 1. Student: Create Complaint
export const createComplaint = async (req, res) => {
  console.log("req.body",req.body)
  try {
    const { studentId, teacherId, complaintText } = req.body;

    const newComplaint = new Complaint({
      studentId,
      teacherId,
      complaintText,
    });

    await newComplaint.save();
    res.status(201).json({ message: "Complaint submitted", data: newComplaint });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Student: Get My Complaints
export const getStudentComplaints = async (req, res) => {
  try {
    const { id } = req.params;
    const complaints = await Complaint.find({ studentId: id })
      .populate("teacherId", "name");

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Admin: Get All Complaints
import Teacher from "../models/signup.model.js";
import Student from "../models/student.model.js";

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });

    const finalData = await Promise.all(
      complaints.map(async (c) => {
        const teacher = await Teacher.findOne({ _id: c.teacherId });
        const student = await Student.findOne({ _id: c.studentId });

        return {
          ...c._doc,
          teacherName: teacher?.name || "Unknown",
          studentName: student?.name || "Unknown",
        };
      })
    );

    res.json(finalData);
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// 4. Admin: Update Status + Response
export const updateComplaint = async (req, res) => {
  try {
    const { status, adminResponse } = req.body;

    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status, adminResponse },
      { new: true }
    );

    res.json({ message: "Complaint updated", data: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
