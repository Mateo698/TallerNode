import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectionString = process.env.MONGO_URI || "mongodb://localhost:27017/test";

export const db = mongoose.connect(connectionString).then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.log(error);
});
