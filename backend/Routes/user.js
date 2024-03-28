import express from "express";
import {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser,
} from "../controllers/userController.js";

import { authenticate, restrict } from "../auth/auth.js";

const router = express.Router();

router.get("/:id",authenticate,restrict(['user']),getSingleUser);
router.get("/", authenticate,restrict(['admin']), getAllUser);
router.put("/:id", authenticate,restrict(['user']), updateUser);
router.delete("/:id", authenticate,restrict(['user']), deleteUser);

export default router;
