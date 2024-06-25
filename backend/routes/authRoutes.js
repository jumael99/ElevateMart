import express from "express";
import {
  registerUser,
  verifyUser,
  setPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/").post(registerUser);

router.route("/verify/:email").post(verifyUser);
router.route("/verify/:email/password").post(setPassword);

export default router;
