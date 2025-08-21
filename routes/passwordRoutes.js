import express from "express";
import {
  requestPasswordReset,
  verifyResetToken,
  resetPassword,
} from "../controllers/passwordConroller.js";

const router = express.Router();

router.post("/forgot-password", requestPasswordReset);
router.get("/reset-password/:token", verifyResetToken);
router.post("/reset-password/:token", resetPassword);

export default router;
