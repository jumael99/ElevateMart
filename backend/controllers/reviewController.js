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

  if (!req.user) {
    console.log('User not authenticated');
    return res.status(401).json({ message: 'User not authenticated' });
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

export { createReview };