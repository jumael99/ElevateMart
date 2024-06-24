import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import generateOTP from "../utils/generateOTP.js";

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, address } = req.body;

  // Check if the name, email, and phone fields are not empty
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please fill in name, email, and phone fields!");
  }

  // Check if the email is valid and unique
  const prevUser = await User.findOne({ email });
  if (prevUser) {
    res.status(400);
    throw new Error("User already exists! Please login to continue.");
  }

  // Create a new user
  // const user = await User.create({
  //   name,
  //   email,
  //   phone,
  //   address,
  // });

  // Create OTP for email verification
  const otp = generateOTP();
  res.status(201).json({ otp });
});

export { registerUser };
