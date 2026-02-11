import mongoose from 'mongoose';

// Mongoose - MongoDB schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number },
});

// Mongoose model
export const UserModel = mongoose.model('User', userSchema);