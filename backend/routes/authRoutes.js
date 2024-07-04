import express from "express";
import {
  registerUser,
  verifyUser,
  requestOTP,
  login,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login", login);
router.route("/verify/:email").post(verifyUser).get(requestOTP);

export default router;
