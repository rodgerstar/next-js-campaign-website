import mongoose from "mongoose";

export async function mongooseConnect() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }

    const uri = process.env.MONGODB_URI;
    console.log("Attempting to connect with URI:", uri.replace(/:([^@]+)@/, ":****@")); // Mask password in logs

    if (!uri) {
        throw new Error("MONGODB_URI is not defined in .env.local");
    }

    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB successfully");
        return mongoose.connection;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}