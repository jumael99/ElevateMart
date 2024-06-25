import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateOTP from "../utils/generateOTP.js";
import sendOTPEmail from "../utils/emailSender.js";
import { encrypt, decrypt } from "../utils/textCypher.js";
import generateToken from "../utils/generateToken.js";

// Decrypt the email
const decryptEmail = (hashedEmail) => {
  const iv = hashedEmail.split("-")[1];
  const encryptedEmail = hashedEmail.split("-")[0];
  const email = decrypt(encryptedEmail, iv);
  return email;
};

// @desc    Register a new user
// @route   POST /api/v1/auth
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
  const user = await User.create({
    name,
    email,
    phone,
    address,
    verificationCode: otp,
  });

  const encryptedEmail = encrypt(email);
  const hashedEmail = encryptedEmail.encryptedData + "-" + encryptedEmail.iv;

  // Hash email and create the verification URL
  const verifyURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/verify/${hashedEmail} `;

  // Send the OTP to the user's email
  await sendOTPEmail(email, otp, verifyURL);

  // Send the response
  res.status(201).json({
    status: "success",
    message: "User created successfully. Please varify your email!",
  });
});

// @desc   Verify a user
// @route  POST /api/v1/auth/verify/:email
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
  }).select("+verificationCode");

  if (!user) {
    res.status(400);
    throw new Error("Invalid Token. No user found with this token!");
  }

  // Check if the OTP is correct
  if (!(await user.verifyVarificationCode(otp, user.verificationCode))) {
    res.status(400);
    throw new Error("Invalid OTP. Please provide the correct OTP!");
  }

  // Check if the user is already verified
  if (user.isVerified) {
    res.status(400);
    throw new Error("User already verified");
  }

  // Update the user as verified
  user.isVerified = true;
  user.verificationCode = undefined;
  await user.save();

  res.cookie("elevateMartUserEmail", email, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(201).json({
    status: "success",
    message: "User Varified",
  });
});

// @desc   Set the password for the user
// @route  POST /api/v1/auth/verify/:email/password
// @access Public
const setPassword = asyncHandler(async (req, res) => {
  const { password, confirmPassword } = req.body;

  // Check if the password and confirm password fields are not empty
  if (!password || !confirmPassword) {
    res.status(400);
    throw new Error("Please provide the password and confirm password!");
  }

  // Check if the password and confirm password match
  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match!");
  }

  // Decrypt the email
  const email = req.cookies.elevateMartUserEmail;
  console.log(email);

  // Get the user from email
  const user = await User.findOne({
    email,
  });

  // Check if the user exists
  if (!user) {
    res.status(400);
    throw new Error("Invalid Token. No user found with this token!");
  }

  // Check if the user is verified
  if (!user.isVerified) {
    res.status(400);
    throw new Error("User not verified. Please verify the user first!");
  }

  // Set the password
  user.password = password;
  await user.save();

  // Destroy the cookie
  res.clearCookie("elevateMartUserEmail");

  // set user cookie with jwt token
  generateToken(res, user._id, user.isAdmin);

  res.status(201).json({
    status: "success",
    message: "Password set successfully",
  });
});

export { registerUser, verifyUser, setPassword };
