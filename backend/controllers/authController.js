import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import createOTP from "../utils/generateOTP.js";
import sendOTPEmail from "../utils/emailSender.js";
import { encrypt, decryptEmail } from "../utils/textCypher.js";
import OTP from "../models/otpModel.js";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, address, password } = req.body;

  // Check if the name, email, and phone fields are not empty
  if (!name || !email || !phone || !password) {
    res.status(400);
    throw new Error("Please fill in name, email, password and phone fields!");
  }

  // Check if the email is valid and unique
  const prevUser = await User.findOne({ email });
  if (prevUser) {
    res.status(400);
    throw new Error("User already exists! Please login to continue.");
  }

  // Generate an OTP
  const otp = await createOTP(email, "verify");

  // Create a new user
  const user = await User.create({
    name,
    email,
    phone,
    address,
    password,
  });

  const encryptedEmail = encrypt(email);
  const hashedEmail = encryptedEmail.encryptedData + "-" + encryptedEmail.iv;

  // Hash email and create the verification URL
  const verifyURL = `${req.protocol}://localhost:3000/verify/${hashedEmail}`;

  // Send the OTP to the user's email
  await sendOTPEmail(user, otp, verifyURL);

  // Send the response
  res.status(201).json({
    status: "success",
    message: "User created successfully. Please varify your email!",
  });
});

// @desc   Verify a user
// @route  POST /api/auth/verify/:email
// @access Public
const verifyUser = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  if (!otp) {
    res.status(400);
    throw new Error("Please provide the OTP!");
  }

  const email = decryptEmail(req.params.email);

  // Get the user from email and OTP
  const user = await User.findOne({
    email,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid Token. No user found with this token!");
  }

  // Check if the user is already verified
  if (user.isVerified) {
    res.status(400);
    throw new Error("User already verified");
  }

  // Find the OTP
  const findOTP = await OTP.findOne({
    email,
    usedFor: "verify",
    active: true,
  });

  if (!findOTP) {
    res.status(400);
    throw new Error("Invalid OTP!");
  }

  // Check if the OTP is valid
  const isMatch = await findOTP.isCorrect(otp);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid OTP!");
  }

  // Check if the OTP has expired
  const isExpired = findOTP.isExpired();
  if (isExpired) {
    res.status(400);
    throw new Error("OTP has expired. Please request a new OTP!");
  }

  // Update the user as verified
  user.isVerified = true;
  await user.save();

  // Update the OTP as inactive
  findOTP.active = false;
  await findOTP.save();

  res.status(201).json({
    status: "success",
    message: "User Varified",
  });
});

// @desc   Request a new OTP
// @route  POST /api/auth/:email/requestOTP
// @access Public

export { registerUser, verifyUser };
