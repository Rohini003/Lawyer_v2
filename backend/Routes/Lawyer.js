import express from "express";
import reviewRouter from "./review.js";
import {
    updateLawyer,
    deleteLawyer,
    getSingleLawyer,
    getAllLawyer,
    getLawyerProfile,
} from "../controllers/lawyerController.js";
import { authenticate, restrict } from "../auth/auth.js";

const router = express.Router();

// Route for managing lawyer reviews
router.use("/:lawyerId/reviews", reviewRouter);

// Routes for managing lawyers
router.get("/:id", getSingleLawyer);
router.get("/", getAllLawyer);
router.put("/:id", authenticate, restrict(["Lawyer"]), updateLawyer);
router.delete("/:id", authenticate, restrict(["Lawyer"]), deleteLawyer);

// Route for getting lawyer's own profile
router.get("/profile/me", authenticate, restrict(["Lawyer"]), getLawyerProfile);

export default router;
