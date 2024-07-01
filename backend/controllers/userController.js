import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile
// @route   GET /profile
// @access  Public
const getProfile = asyncHandler(async (req, res) => {
  // Assuming req.user contains the logged-in user's data
  const profile = await User.findOne({ email: "jane.doe@example.com" });
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found x' });
  }
  res.json(profile);
});


// @desc    Edit user profile
// @route   PUT /profile
// @access  Public
const updateProfile = asyncHandler(async (req, res) => {
  const updatedData = req.body;

  // Find the Profile by the logged-in user's email and update it
  // Assuming req.user contains the logged-in user's data
  const profile = await User.findOneAndUpdate(
      { email: "johndoe@example.com" },
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
