import Profile from '../models/profileModel.js';
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Get user profile
// @route   GET /profile
// @access  Public
export const getProfile = asyncHandler(async (req, res) => {
    // Assuming req.user contains the logged-in user's data
    const profile = await Profile.findOne({ email: "imtiaj.hossain@example.com" });
    if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
});

// @desc    Edit user profile
// @route   PUT /profile
// @access  Public
export const updateProfile = asyncHandler(async (req, res) => {
    const updatedData = req.body;

    // Find the Profile by the logged-in user's email and update it
    // Assuming req.user contains the logged-in user's data
    const profile = await Profile.findOneAndUpdate(
        { email: "john.doe@example.com" },
        updatedData,
        { new: true, runValidators: true }
    );

    if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
});
