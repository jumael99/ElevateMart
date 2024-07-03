import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import createOTP from "../utils/generateOTP.js";
import sendOTPEmail from "../utils/emailSender.js";
import { encrypt, decryptEmail } from "../utils/textCypher.js";
import OTP from "../models/otpModel.js";


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('Username not matched');
      return res.status(400).json({ message: 'Username not matched' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password not matched');
      return res.status(400).json({ message: 'Password not matched' });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

     res.json({ token });
     
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  console.log("Hello form registerUser");
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
  console.log(hashedEmail);
  

  // Create the verification URL
  const verifyURL = `${process.env.FRONTEND_URL}/auth/verify/${hashedEmail}`;

  // Send the OTP
  await sendOTPEmail(user, otp, verifyURL);

  // Send the response
  res.status(201).json({
    status: "success",
    message: "User created successfully. Please varify your email!",
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
  OTP.deleteOne({ _id: otpRecord._id });

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

export { registerUser, verifyUser, requestOTP, login };
