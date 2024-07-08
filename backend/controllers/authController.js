import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import createOTP from "../utils/generateOTP.js";
import { sendPasswordResetEmail, sendOTPEmail } from "../utils/emailSender.js";
import { encrypt, decryptEmail } from "../utils/textCypher.js";
import OTP from "../models/otpModel.js";

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ message: "Username or Password didn't match!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Username or Password didn't match!" });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, address, password } = req.body;

  // Fields check
  if (!name || !email || !phone || !password) {
    res.status(400);
    throw new Error("Please fill in name, email, password and phone fields!");
  }

  // User Check
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

  // Encrypt the email
  const encryptedEmail = encrypt(email);
  const hashedEmail = encryptedEmail.encryptedData + "-" + encryptedEmail.iv;

  // Create the verification URL
  const verifyURL = `${process.env.FRONTEND_URL}/auth/verify/${hashedEmail}`;

  // Send the OTP
  await sendOTPEmail(user, otp, verifyURL);

  // Send the response
  res.status(201).json({
    status: "success",
    message: "User created successfully. Please verify your email!",
    data: {
      url: verifyURL,
    },
  });
});

// @desc   Verify a user
// @route  POST /api/auth/verify/:email
// @access Public
const verifyUser = asyncHandler(async (req, res) => {
  const { otp } = req.body;

  // Field Check
  if (!otp) {
    res.status(400);
    throw new Error("Please provide the OTP!");
  }

  const email = decryptEmail(req.params.email);

  // Get User
  const user = await User.findOne({
    email,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid Token. No user found with this token!");
  }

  // Check user is verified
  if (user.isVerified) {
    res.status(400);
    throw new Error("User already verified");
  }

  // Find the OTP
  const otpRecord = await OTP.findOne({
    email,
    active: true,
  });

  const isMatch = await otpRecord.isCorrect(otp);

  if (!otpRecord || !isMatch) {
    res.status(400);
    throw new Error("Invalid OTP. Please try again!");
  }

  // Check for expiry
  const isExpired = otpRecord.isExpired();
  if (isExpired) {
    res.status(400);
    throw new Error("OTP has expired. Please request a new OTP!");
  }

  // Update user
  user.isVerified = true;
  await user.save();

  // Delete the OTP
  await OTP.findByIdAndDelete(otpRecord._id);

  res.status(201).json({
    status: "success",
    message:
      "Welcome to ElevateMart! Your account has been verified successfully!",
  });
});

// @desc   Request a new OTP
// @route  GET /api/auth/:email
// @access Public
const requestOTP = asyncHandler(async (req, res) => {
  const email = decryptEmail(req.params.email);

  // Get the user from email
  const user = await User.findOne({
    email,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid Token. No user found with this token!");
  }

  // Check user is verified
  if (user.isVerified) {
    res.status(400);
    throw new Error("User already verified");
  }

  // Deactivate the active OTP
  const activeOTP = await OTP.findOne({
    email,
    active: true,
  });

  // Delete the active OTP
  if (activeOTP) {
    OTP.deleteOne({ _id: activeOTP._id });
  }

  // Create a new OTP
  const newOtp = await createOTP(email, "verify");

  // Create the verification URL
  const verifyURL = `${process.env.FRONTEND_URL}/auth/verify/${req.params.email}`;

  // Send OTP
  await sendOTPEmail(user, newOtp, verifyURL);

  res.status(201).json({
    status: "success",
    message: "OTP sent successfully",
  });
});

// @desc   Forget Password
// @route  POST /api/auth/forget-password
// @access Public
const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Finding the user
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    res.status(400);
    throw new Error("User not found! Please register to continue.");
  }

  // Generate an OTP
  const otp = await createOTP(email, "reset");

  // Encrypt the email
  const encryptedEmail = encrypt(email);
  const hashedEmail = encryptedEmail.encryptedData + "-" + encryptedEmail.iv;

  // Reset URL
  const resetURL = `${process.env.FRONTEND_URL}/auth/reset-password/${hashedEmail}/${otp}`;

  // Send the email
  await sendPasswordResetEmail(existingUser, resetURL);

  res.status(201).json({
    status: "success",
    message: "OTP sent successfully. Please check your email!",
  });
});

// @desc   Reset Password request verification
// @route  GET /api/auth/reset-password/:email/:otp
// @access Public
const verifyResetPasswordRequest = asyncHandler(async (req, res) => {
  const { email, token } = req.params;

  // Decrypt the email
  const decryptedEmail = decryptEmail(email);

  // Find the user
  const existingUser = await User.findOne({ email: decryptedEmail });

  const otpRecord = await OTP.findOne({
    email: decryptedEmail,
    active: true,
  });

  if (!existingUser || !otpRecord) {
    res.status(400);
    throw new Error("Invalid OTP. Please try again!");
  }

  const isMatch = otpRecord.isCorrect(token);

  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid OTP. Please try again!");
  }

  // Check for expiry
  const isExpired = otpRecord.isExpired();

  if (isExpired) {
    res.status(400);
    throw new Error("OTP has expired. Please request a new OTP!");
  }

  // Delete otp
  await OTP.findByIdAndDelete(otpRecord._id);

  res.status(201).json({
    status: "success",
    message: "OTP verified successfully. You can reset your password now!",
  });
});

// @desc   Reset Password
// @route  POST /api/auth/reset-password/:email/
// @access Public
const resetPassword = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const { password } = req.body;

  // Decrypt the email
  const decryptedEmail = decryptEmail(email);

  // Find the user
  const existingUser = await User.findOne({ email: decryptedEmail });

  if (!existingUser) {
    res.status(400);
    throw new Error("User not found! Please register to continue.");
  }

  // Update the password
  existingUser.password = password;
  await existingUser.save();

  res.status(201).json({
    status: "success",
    message: "Password reset successfully. Please login to continue!",
  });
});

export {
  login,
  verifyUser,
  requestOTP,
  registerUser,
  forgetPassword,
  resetPassword,
  verifyResetPasswordRequest,
};
