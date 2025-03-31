import { mongooseConnect } from "@/lib/mongodb";
import Profile from "@/models/Profile";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  try {
    await mongooseConnect();
    console.log("Connected to MongoDB");

    // Log Profile to verify it's imported
    console.log("Profile model:", Profile);
    if (!Profile) {
      throw new Error("Profile model is undefined - check import");
    }

    const { email, password } = req.body;
    console.log("Request body:", { email, password });

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user exists
    const existingUser = await Profile.findOne({ email });
    console.log("Existing user:", existingUser);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await Profile.create({ email, password: hashedPassword });
    console.log("New user created:", newUser);

    return res.status(201).json({ message: "User created successfully", user: { email: newUser.email, id: newUser._id } });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};