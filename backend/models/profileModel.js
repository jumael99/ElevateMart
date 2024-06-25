import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        number: { type: String, required: true },
        city: { type: String, required: true },
        zip: { type: String, required: true }
    },
    profilePhoto: { type: String, required: false }
});

const Profile = mongoose.model('Profile', ProfileSchema);

export default Profile;
