import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    default: "admin",
  },
  status: {
    type: Number,
    default: 1,
  },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
