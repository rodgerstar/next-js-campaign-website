const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://rodgers:rodgers1234@cluster0.ufkew.mongodb.net/portfolio?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
