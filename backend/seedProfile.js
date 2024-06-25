import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Profile from './models/profileModel.js';
import connectDB from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('MONGO_URI:', process.env.MONGO_URI);


const seedProfiles = async () => {
    try {

        await connectDB();

        await Profile.deleteMany();

        const profiles = [
            {
                firstName: 'John',
                lastName: 'Doe',
                birthday: new Date('1990-01-01'),
                gender: 'Male',
                email: 'john.doe@example.com',
                phone: '1234567890',
                address: {
                    street: 'Main Street',
                    number: '123',
                    city: 'Metropolis',
                    zip: '12345'
                },
                profilePhoto: 'https://example.com/photos/john.jpg'
            },
            {
                firstName: 'Jane',
                lastName: 'Smith',
                birthday: new Date('1985-05-15'),
                gender: 'Female',
                email: 'jane.smith@example.com',
                phone: '0987654321',
                address: {
                    street: 'Second Street',
                    number: '456',
                    city: 'Smallville',
                    zip: '67890'
                },
                profilePhoto: 'https://example.com/photos/jane.jpg'
            }
        ];

        await Profile.insertMany(profiles);
        console.log('Sample profiles inserted!');

        mongoose.connection.close();
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedProfiles();
