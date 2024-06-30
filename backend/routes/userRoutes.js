import express from "express";
import { registerUser,getProfile, updateProfile } from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser);

router.route('/').get(getProfile).put(updateProfile);

export default router;
