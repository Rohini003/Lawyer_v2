import express from "express";

import {
  updateLawyer,
  deleteLawyer,
  getSingleLawyer,
  getAllLawyer,
  getLawyerProfile,
} from "../controllers/lawyerController.js";

import { authenticate, restrict } from "../auth/auth.js";

import reviewRouter from "./review.js"

const router = express.Router();

router.use("/:lawyerId/reviews", reviewRouter)

router.get("/:id", getSingleLawyer);
router.get("/", getAllLawyer);
router.put("/:id", authenticate,restrict(['Lawyer']), updateLawyer);
router.delete("/:id", authenticate,restrict(['Lawyer']), deleteLawyer);

router.get("/profile/me", authenticate,restrict(['Lawyer']), getLawyerProfile);


export default router;