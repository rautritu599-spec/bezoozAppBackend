import stripe from "../../stripe.js";
import Payment from "../models/payment.model.js";
export const createCheckoutSession = async (req, res) => {
  try {
    const { amount, courseName, courseId, studentEmail } = req.body;

    const amountInPaise = Math.round(Number(amount) * 100);

    if (!amountInPaise || isNaN(amountInPaise)) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: courseName },
            unit_amount: amountInPaise,
          },
          quantity: 1,
        },
      ],
      success_url: `https://bezoozappbackend.onrender.com/success?session_id={CHECKOUT_SESSION_ID}&email=${studentEmail}`,
      cancel_url: "https://bezoozappbackend.onrender.com/cancel",
    });

    await Payment.create({
      studentEmail,
      courseId,
      courseName,
      amount,
      stripeSessionId: session.id,
      paymentStatus: "pending",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.log("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const markPaymentSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const payment = await Payment.findOneAndUpdate(
      { stripeSessionId: sessionId },
      { paymentStatus: "paid" },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json({ message: "Payment updated", payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
