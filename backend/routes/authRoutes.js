import express from "express";
import {
  registerUser,
  verifyUser,
  setPassword,
  checkUserVerified,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/").post(registerUser);

router.route("/verify/:email").post(verifyUser).get(checkUserVerified);
router.route("/verify/:email/password").post(setPassword);

export default router;
