// controllers/reviewController.js
import Review from '../models/reviewModel.js';
import Product from '../models/productModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { productId, rating, comment } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const alreadyReviewed = await Review.findOne({ product: productId, user: req.user._id });

  if (alreadyReviewed) {
    res.status(400);
    throw new Error('You have already reviewed this product');
  }

  const review = new Review({
    product: productId,
    user: req.user._id,
    rating: Number(rating),
    comment,
  });

  await review.save();

  product.reviews.push(review._id);
  product.numReviews = product.reviews.length;
  product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.numReviews;

  await product.save();

  res.status(201).json({ message: 'Review added' });
});

// @desc    Get reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');

  res.json(reviews);
});

export { createReview, getReviews };
