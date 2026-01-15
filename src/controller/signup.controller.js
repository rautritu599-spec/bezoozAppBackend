import "../models/connection.js";
import jwt from "jsonwebtoken";
import rs from "randomstring";
import signupSchemaModel from "../models/signup.model.js";


export const saveStatus = async (req, res) => {
  console.log("🔥 HIT saveStatus");
  console.log("🔥 BODY:", req.body);

  var signuptList = await signupSchemaModel.find();
  var len = signuptList.length;
  var _id = (len == 0) ? 1 : signuptList[len - 1]._id + 1;
  var signupDetail = req.body;
  signupDetail = { ...signupDetail, "_id": _id, "role": "teacher", "status": 0, "info": Date() };
console.error("Save studentdetail :", signupDetail);



  try {
    var signup = await signupSchemaModel.create(signupDetail);
    console.error("Save teacher create:", signup);

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
  var signup = await signupSchemaModel.find(req.query);

  if (signup) {
    res.status(200).json(signup)
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

    const updated = await signupSchemaModel.findOneAndUpdate(
      { email: condition_obj.email },
      content_obj,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "teacher not found" });
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
export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await signupSchemaModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};



// Aapka fixed secret key (for demo)
const JWT_SECRET = "my_super_secret_key";

export const loginStatus = async (req, res) => {
  try {
    var condition_obj = { ...req.body, status: 1 };
    var signupDetails = await signupSchemaModel.find(condition_obj);

    if (signupDetails.length != 0) {
      const user = signupDetails[0];

      // Safe payload only
      const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
        status: user.status,
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({ token, signupDetails: user });
    } else {
      res.status(404).json({ msg: "invalid email or password" });
    }
  } catch (err) {
    console.error("Login backend error:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};
