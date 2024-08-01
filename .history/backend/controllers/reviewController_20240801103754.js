import Review from '../models/reviewModel.js';
import Product from '../models/productModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {

  const { productId, rating, comment } = req.body;

  if (!productId || !rating || !comment) {
    throw new Error('Missing required fields');
  }

  if (!req.user) {
    throw new Error('User not authenticated')
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

// @desc    Get reviews for a specific product
// @route   GET /api/reviews/product/:productId
// @access  Public
const getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const reviews = await Review.find({ product: productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error('Error in getProductReviews:', error);
    res.status(500).json({ message: 'Server error', error: error.toString() });
  }
});

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    const updatedReview = await review.save();
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.toString() });
  }
});

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(404).json({ message: 'Review not found' });
  }

  if (review.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Login First' });
  }

  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: 'Review removed' });
});


export { createReview, getProductReviews ,updateReview,deleteReview};