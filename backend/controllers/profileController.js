import Profile from '../models/profileModel.js';

// GET Profile Controller
export const getProfile = async (req, res) => {
    try {
        // Assuming req.user contains the logged-in user's data
        const profile = await Profile.findOne({ email: "john.doe@example.com" });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE Profile Controller
export const updateProfile = async (req, res) => {
    try {
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
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
