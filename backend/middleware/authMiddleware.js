import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next();
  }
 
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const existingUser = await User.findById(decoded.userId);
  
  const passwordUpdated = existingUser.hasUpdatedPassword(decoded.iat);
  //  console.log(existingUser + " " + passwordUpdated);
  if (passwordUpdated) {
    return next();
  }
  console.log(existingUser + " " + passwordUpdated);
  req.user = existingUser;

  next();
});

export default authMiddleware;