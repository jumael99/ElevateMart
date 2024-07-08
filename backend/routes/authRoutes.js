import express from "express";
import {
  registerUser,
  verifyUser,
  requestOTP,
  forgetPassword,
  verifyResetPasswordRequest,
  resetPassword,
  login,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(registerUser);
router.route("/verify/:email").post(verifyUser).get(requestOTP);
router.route("/forget-password").post(forgetPassword);
router.route("/reset-password/:email").post(resetPassword);
router.route("/reset-password/:email/:token").get(verifyResetPasswordRequest);

export default router;
