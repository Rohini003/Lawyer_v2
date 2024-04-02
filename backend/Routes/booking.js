import express from "express";
import { authenticate } from "../auth/auth.js";
import { getCheckoutSession } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/checkout-session/:lawyerId", authenticate, getCheckoutSession);

export default router;
