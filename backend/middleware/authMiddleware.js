import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const existingUser = await User.findById(decoded.userId);

    if (existingUser) {
      const passwordUpdated = existingUser.hasUpdatedPassword(decoded.iat);
      if (!passwordUpdated) {
        req.user = existingUser;
      }
    }
  } catch (error) {
    next();
  }

  next();
});

export default authMiddleware;
