import mongoose from "mongoose";

//DTO
export interface UserInput {
    name: string;
    email: string;
    password: string;
    groups: string[];
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    deleteAt?: Date;
}

// Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true},
    groups: [{ type: String, required: true }],
}, {timestamps: true, collection: "users"});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;

