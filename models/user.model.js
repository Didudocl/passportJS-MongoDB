import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    googleId: String,
    picture: String
});

export const User = mongoose.model('user', userSchema);
