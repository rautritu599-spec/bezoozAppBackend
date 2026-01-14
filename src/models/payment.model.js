import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    studentEmail: {
      type: String,
      required: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // agar tumhare paas Student model hai
    },
courseId: {
  type: String,
  required: true,
},

    courseName: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    stripeSessionId: {
      type: String,
      required: true,
    },

    stripePaymentIntentId: {
      type: String,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      default: "stripe",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
