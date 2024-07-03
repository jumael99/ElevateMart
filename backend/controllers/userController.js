import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Get user profile
// @route   GET /api/profile
// @access  Public
const getProfile = asyncHandler(async (req, res) => {
  // Assuming req.user contains the logged-in user's data
  const profile = await User.findOne({ email: "alice.smith@example.com" });
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found x' });
  }
  res.json(profile);
});


// @desc    Edit user profile
// @route   PUT /api/profile
// @access  Public
const updateProfile = asyncHandler(async (req, res) => {
  const updatedData = req.body;

  // Find the Profile by the logged-in user's email and update it
  // Assuming req.user contains the logged-in user's data
  const profile = await User.findOneAndUpdate(
      { email: "alice.smith@example.com" },
      updatedData,
      { new: true, runValidators: true }
  );

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  res.json(profile);
});

export {
  registerUser,
  getProfile,
  updateProfile
};
