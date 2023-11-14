import mongoose from "mongoose";
import { Schema } from "mongoose";

//DTO
export interface UserInput {
    name: string;
    email: string;
    password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    deleteAt?: Date;
    role: "superadmin" | "user";
    groups: string[];
}

// Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true},
    groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
    role: { type: String, required: false, enum: ["superadmin", "user"], default: "user" }
}, {timestamps: true, collection: "users"});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;

