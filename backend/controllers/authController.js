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

  // Feilds check
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
  const verifyURL = `${req.protocol}://localhost:3000/auth/verify/${hashedEmail}`;

  // Send the OTP
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

  // Feild Check
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

  // Check user is varified
  if (user.isVerified) {
    res.status(400);
    throw new Error("User already verified");
  }

  // Find the OTP
  const findOTP = await OTP.findOne({
    email,
    active: true,
  });

  if (!findOTP) {
    res.status(400);
    throw new Error("Invalid OTP!");
  }

  // Check for validity
  const isMatch = await findOTP.isCorrect(otp);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid OTP!");
  }

  // Check for expiry
  const isExpired = findOTP.isExpired();
  if (isExpired) {
    res.status(400);
    throw new Error("OTP has expired. Please request a new OTP!");
  }

  // Update user
  user.isVerified = true;
  await user.save();

  // Update OTP
  findOTP.active = false;
  findOTP.used = true;
  await findOTP.save();

  res.status(201).json({
    status: "success",
    message: "User Varified",
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

  // Check user is varified
  if (user.isVerified) {
    res.status(400);
    throw new Error("User already verified");
  }

  // Deactivate the active OTP
  const activeOTP = await OTP.findOne({
    email,
    active: true,
  });

  if (activeOTP) {
    activeOTP.active = false;
    await activeOTP.save();
  }

  // Create a new OTP
  const newOtp = await createOTP(email, "verify");

  // Create the verification URL
  const verifyURL = `${req.protocol}://localhost:3000/auth/verify/${req.params.email}`;

  // Send OTP
  await sendOTPEmail(user, newOtp, verifyURL);

  res.status(201).json({
    status: "success",
    message: "OTP sent successfully",
  });
});

export { registerUser, verifyUser, requestOTP };
