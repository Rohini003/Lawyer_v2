import express from "express";
import {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser,
  getUserProfile,
  getMyAppointments,
} from "../controllers/userController.js";

import { authenticate, restrict } from "../auth/auth.js";

const router = express.Router();

router.get("/:id",authenticate,restrict(['user']),getSingleUser);
router.get("/", authenticate,restrict(['admin']), getAllUser);
router.put("/:id", authenticate,restrict(['user']), updateUser);
router.delete("/:id", authenticate,restrict(['user']), deleteUser);
router.get("/profile/me", authenticate,restrict(['user']), getUserProfile);
router.get("appointments/my-appointments", authenticate,restrict(['user']), getMyAppointments);

export default router;
