import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc    Get user profile
// @route   GET /api/users
// @access  Protected
const getProfile = asyncHandler(async (req, res) => {
  const { email } = req.user;

  const profile = await User.findOne({ email });
  if (!profile) {
    throw new Error("Profile not found");
  }
  res.status(200).json(profile);
});

// @desc    Edit user profile
// @route   PUT /api/users
// @access  Protected
const updateProfile = asyncHandler(async (req, res) => {
  const { email, phone, address, name, image } = req.body;

  const profile = await User.findOne({ email });
  if (!profile) {
    throw new Error("Profile not found");
  }

  if (profile._id.toString() !== req.user._id.toString()) {
    throw new Error("You are not authorized to update this profile");
  }

  const newProfileData = await User.findByIdAndUpdate(
    profile._id,
    {
      name,
      phone,
      address,
      profilePicture: image,
    },
    { new: true }
  );

  res.status(200).json(newProfileData);
});

export { getProfile, updateProfile };
