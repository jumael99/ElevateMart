import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Get user profile
// @route   GET /api/users
// @access  Protected
const getProfile = asyncHandler(async (req, res) => {

  const { email } = req.body;

  const profile = await User.findOne({ email});
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found x' });
  }
  res.json(profile);
});


// @desc    Edit user profile
// @route   PUT /api/users
// @access  Protected
const updateProfile = asyncHandler(async (req, res) => {
  const { email, phone, address, name} = req.body;

  const profile = await User.findOneAndUpdate(
      { email },
      { phone, address, name},
      { new: true, runValidators: true }
  );

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  res.json(profile);
});

export {
  getProfile,
  updateProfile
};
