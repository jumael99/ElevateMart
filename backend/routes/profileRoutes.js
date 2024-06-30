import * as profileController from '../controllers/profileController_jak.js';
import express from 'express';
const router = express.Router();


// GET Profile Route
router.get('/', profileController.getProfile)
    .put('/', profileController.updateProfile);

export default router;
