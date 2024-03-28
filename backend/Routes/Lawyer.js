import express from "express";

import {
  updateLawyer,
  deleteLawyer,
  getSingleLawyer,
  getAllLawyer,
} from "../controllers/lawyerController.js";

import { authenticate, restrict } from "../auth/auth.js";

import reviewRouter from "./review.js"

const router = express.Router();

router.use("/:doctorId/reviews", reviewRouter)

router.get("/:id", getSingleLawyer);
router.get("/", getAllLawyer);
router.put("/:id", authenticate,restrict(['Lawyer']), updateLawyer);
router.delete("/:id", authenticate,restrict(['Lawyer']), deleteLawyer);

export default router;