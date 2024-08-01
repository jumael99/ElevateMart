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


// @desc    get all users
// @route   get /api/users/allUsers
// @access  Protected

const getAllUsers = asyncHandler(async (req, res) => {
    const allusers =await User.find({}, '-password');
    res.status(200).json(allusers);
});


// @desc    get all users order data
// @route   get /api/users/:id
// @access  Protected
const getUsersOrderData = asyncHandler(async (req, res) => {
    const allOrders = await User.find({}, "-password");
    res.status(200).json(allusers);
});


// @desc    Promoted user
// @route   PUT /api/users/:id/promote
// @access  Protected

const userPromote = asyncHandler(async (req, res) => {
    const { id } = req.body;

    const profile = await User.findOne({ _id:id });
    if (!profile) {
        throw new Error("Profile not found");
    }

    if (profile._id.toString() !== req.user._id.toString()) {
        throw new Error("You are not authorized to update this profile");
    }

    profile.isAdmin=true;
    await profile.save()

    res.status(200).json({
        status: "success",
        message: "User successfully promoted to Admin",
    });
});




export { getProfile, updateProfile, userPromote,getAllUsers };
