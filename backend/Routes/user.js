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

router.get("/:id", authenticate, restrict(["client"]), getSingleUser);
router.get("/", authenticate, restrict(["lawyer"]), getAllUser);
router.put("/:id", authenticate, restrict(["client"]), updateUser);
router.delete("/:id", authenticate, restrict(["client"]), deleteUser);
router.get("/profile/me", authenticate, restrict(["client"]), getUserProfile);
router.get(
    "/appointments/my-appointments",
    authenticate,
    restrict(["client"]),
    getMyAppointments
);

export default router;
