import * as profileController from '../controllers/profileController.js';
import express from 'express';
const router = express.Router();


// GET Profile Route
router.get('/', profileController.getProfile);

// UPDATE Profile Route
router.put('/', profileController.updateProfile);

export default router;
