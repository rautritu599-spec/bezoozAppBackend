import "../models/connection.js";
import jwt from "jsonwebtoken";
import rs from "randomstring";
import studentSchemaModel from "../models/student.model.js";



export const saveStatus = async (req, res) => {
  console.log("🔥 HIT saveStatus");
  console.log("🔥 BODY:", req.body);

  var studentList = await studentSchemaModel.find();
  var len = studentList.length;
  var _id = (len == 0) ? 1 : studentList[len - 1]._id + 1;
  var studentDetail = req.body;
  studentDetail = { ...studentDetail, "_id": _id, "role": "student", "status": 0, "info": Date() };
console.error("Save studentdetail :", studentDetail);



  try {
    var student = await studentSchemaModel.create(studentDetail);
    console.error("Save student create:", student);

    res.status(201).json({ "status": true });
  }
   catch (err) {
  console.error("🔥 INTERNAL ERROR:", err);
  return res.status(500).json({
    status: false,
    message: err.message,
    stack: err.stack
  });
}

}




export const fetchStatus = async (req, res) => {
  var student = await studentSchemaModel.find(req.query);

  if (student) {
    res.status(200).json(student)
  }
  else {
    res.status(404).json({ "msg": "resoure code" });
  }

}


export const updateStatus = async (req, res) => {
  try {
    console.log("UPDATE HIT BODY =>", req.body);

    const { condition_obj, content_obj } = req.body;

    if (!condition_obj || !condition_obj.email) {
      return res.status(400).json({ message: "Email missing" });
    }

    const updated = await studentSchemaModel.findOneAndUpdate(
      { email: condition_obj.email },
      content_obj,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({
      message: "Updated successfully",
      data: updated,
    });
  } catch (err) {
    console.log("UPDATE ERROR =>", err);
    return res.status(500).json({ message: "Update failed" });
  }
};

// --- DELETE TEACHER ---
export const deleteStudent = async (req, res) => {
  
  try {
    const { id } = req.params;
    const deleted = await studentSchemaModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

// Aapka fixed secret key (for demo)
const JWT_SECRET = "my_super_secret_key";

export const loginStatus = async (req, res) => {
  try {
    var condition_obj = { ...req.body, status: 1 };
    var studentDetails = await studentSchemaModel.find(condition_obj);

    if (studentDetails.length != 0) {
      const user = studentDetails[0];

      // Safe payload only
      const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
        status: user.status,
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({ token, studentDetails: user });
    } else {
      res.status(404).json({ msg: "invalid email or password" });
    }
  } catch (err) {
    console.error("Login backend error:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};
