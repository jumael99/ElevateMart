import express from "express";
import { registerUser, verifyUser } from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/verify/:email").post(verifyUser);

export default router;
