import mongoose from "mongoose";

export interface GroupInput {
    name: string;
}

export interface GroupDocument extends GroupInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    deleteAt?: Date;
    usersId: string[];
}

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 50 },
    usersId: [{ type: String, required: true }],
}, {timestamps: true, collection: "groups"});

const Group = mongoose.model<GroupDocument>("Group", groupSchema);

export default Group;