// lib/mongodb.js
import mongoose from "mongoose";

export async function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection; // Return the existing connection
  }

  const uri = process.env.MONGODB_URI;
  console.log("Attempting to connect with URI:", uri?.replace(/:([^@]+)@/, ":****@")); // Mask password in logs

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in .env.local");
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 60000, // 60s timeout for server selection
      socketTimeoutMS: 70000, // 70s timeout for socket
    });
    console.log("Connected to MongoDB successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}