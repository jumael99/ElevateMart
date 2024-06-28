import express from "express";
import {
  registerUser,
  verifyUser,
  requestOTP,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/verify/:email").post(verifyUser).get(requestOTP);

export default router;
