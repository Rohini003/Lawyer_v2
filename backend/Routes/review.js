import express from "express";
import {
  createReview,
  getAllReviews,
} from "../controllers/reviewController.js";
import { authenticate, restrict } from "../auth/auth.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviews)
  .post(authenticate, restrict(['user']), createReview);

export default router;
