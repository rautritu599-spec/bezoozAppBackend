import express from "express";
import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

const JWT_SECRET = "mysecretkey"; // later env me shift karna

// ================= CREATE ADMIN (SIGNUP) =================
router.post("/save", async (req, res) => {
  try {
    console.log(" HIT saveStatus");
    console.log(" BODY:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password required" });
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(409).json({ msg: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminDetail = {
      email,
      password: hashedPassword,
      role: "admin",
      status: 1,
      info: new Date(),
    };

    const admin = await Admin.create(adminDetail);
    console.log("Save admin create:", admin);

    res.status(201).json({
      status: true,
      msg: "Admin created successfully",
    });
  } catch (err) {
    console.error("🔥 INTERNAL ERROR:", err);
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

// ================= LOGIN ADMIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email, status: 1 });

    if (!admin) {
      return res.status(404).json({ msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const payload = {
      _id: admin._id,
      email: admin.email,
      role: admin.role,
      status: admin.status,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      success: true,
      token,
      admin: payload,
    });
  } catch (err) {
    console.error("Login backend error:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

export default router;
