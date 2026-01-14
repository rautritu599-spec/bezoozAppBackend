import express from "express";
import {
  createCheckoutSession,
  markPaymentSuccess,
  getAllPayments
} from "../controller/payment.controller.js";

const router = express.Router();

router.post("/create-checkout", createCheckoutSession);
router.post("/success", markPaymentSuccess);

// 🔥 NEW: Admin ke liye
router.get("/all", getAllPayments);

export default router;
