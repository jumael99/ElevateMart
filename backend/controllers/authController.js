import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import generateOTP from "../utils/generateOTP.js";
import sendOTPEmail from "../utils/emailSender.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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

  // Generate an OTP
  const otp = await generateOTP();

  // Create a new user
  // const user = await User.create({
  //   name,
  //   email,
  //   phone,
  //   address,
  //   verificationCode: otp,
  // });

  // Hash email and send it in the email
  const hashedEmail = crypto.createHash("sha256").update(email).digest("hex");

  // Send the OTP to the user's email
  await sendOTPEmail(email, otp, hashedEmail);

  // Send the response
  res.status(201).json({
    status: "success",
    message: "User created successfully. Please varify your email!",
  });
});

const verifyUser = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  console.log(req.params.email);
  if (!otp) {
    res.status(400);
    throw new Error("Please provide the OTP!");
  }
  // Send Respones
  res.status(201).json({
    status: "success",
    message: "User Varified",
  });
});

export { registerUser, verifyUser };
