import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    studentId: {
      type: Number,   //  changed
      required: true,
    },
    teacherId: {
      type: Number,   //  changed
      required: true,
    },
    complaintText: {
      type: String,
      required: true,
    },
    adminResponse: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
