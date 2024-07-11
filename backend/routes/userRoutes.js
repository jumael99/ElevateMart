import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import protect from "../middleware/protectMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getProfile).put(updateProfile);

export default router;
