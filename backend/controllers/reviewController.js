// controllers/reviewController.js
import Review from '../models/reviewModel.js';
import Product from '../models/productModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  console.log('Create Review endpoint hit');
  console.log('Request body:', req.body);
  console.log('User:', req.user);

  const { productId, rating, comment } = req.body;

  if (!productId || !rating || !comment) {
    console.log('Missing required fields');
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      console.log('Product not found');
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = new Review({
      product: productId,
      user: req.user._id,
      rating: Number(rating),
      comment,
    });

    const savedReview = await review.save();
    console.log('Saved review:', savedReview);
    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error in createReview:', error);
    res.status(500).json({ message: 'Server error', error: error.toString() });
  }
});


// @desc    Get reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');

  res.json(reviews);
});

const canUserReviewProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  // For testing purposes, let's say users with odd-numbered IDs can review odd-numbered products,
  // and users with even-numbered IDs can review even-numbered products
  const canReview = userId % 2 === productId % 2;

  res.json({ canReview });
});

const updateReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const review = await Review.findById(req.params.id);

  if (review) {
    if (review.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this review');
    }

    review.rating = Number(rating) || review.rating;
    review.comment = comment || review.comment;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } else {
    res.status(404);
    throw new Error('Review not found');
  }
});

const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (review) {
    if (review.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this review');
    }

    await review.remove();
    res.json({ message: 'Review removed' });
  } else {
    res.status(404);
    throw new Error('Review not found');
  }
});

export { createReview, getReviews, canUserReviewProduct, updateReview, deleteReview };
