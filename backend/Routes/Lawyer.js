import express from "express";

import {
  updateLawyer,
  deleteLawyer,
  getSingleLawyer,
  getAllLawyer,
} from "../controllers/lawyerController.js";

const router = express.Router();

router.get("/:id", getSingleLawyer);
router.get("/", getAllLawyer);
router.put("/:id", updateLawyer);
router.delete("/:id", deleteLawyer);

export default router;