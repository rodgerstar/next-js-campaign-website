import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
}, {
  timestamps: true
});

// Use existing model if defined, otherwise create it
const Profile = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema, "admin");

export default Profile;