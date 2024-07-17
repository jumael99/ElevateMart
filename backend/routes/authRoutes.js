import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import isAdminMiddleware from '../middleware/isAdminMiddleware.js';  
import {
  login,
  logout,
  registerUser,
  verifyUser,
  requestOTP,
  forgetPassword,
  verifyResetPasswordRequest,
  resetPassword,
} from '../controllers/authController.js';

const router = express.Router();

router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/register').post(registerUser);
router.route('/verify/:email').post(verifyUser).get(requestOTP);
router.route('/forget-password').post(forgetPassword);
router.route('/reset-password/:email').post(resetPassword);
router.route('/reset-password/:email/:token').get(verifyResetPasswordRequest);

router.route('/admin/dashboard').get(authMiddleware, isAdminMiddleware, (req, res) => {
   if (req.isAdmin) {
    res.status(200).json({ message: 'Welcome to the admin dashboard!' });
  } else {
    res.status(403).json({ message: 'Forbidden: Only admins can access this resource.' });
  }
});

export default router;
