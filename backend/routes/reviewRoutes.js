import express from 'express';
import {
  createReview,
  getReviews,
  canUserReviewProduct,
  updateReview,
  deleteReview
} from '../controllers/reviewController.js';
import protect from "../middleware/protectMiddleware.js";

const router = express.Router();

router.route('/').post(protect,createReview);
router.route('/product/:productId').get(getReviews);
router.route('/can-review/:productId').get(protect, canUserReviewProduct);
router.route('/:reviewId')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

export default router;