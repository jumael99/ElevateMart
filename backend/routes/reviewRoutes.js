// routes/reviewRoutes.js
import express from 'express';
import { createReview, getReviews } from '../controllers/reviewController.js';
import protect from "../middleware/protectMiddleware.js";

const router = express.Router();

router.route('/').post(protect, createReview);
router.route('/:productId').get(getReviews);

export default router;
