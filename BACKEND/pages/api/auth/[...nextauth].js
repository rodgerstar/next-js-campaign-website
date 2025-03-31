// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // Correct import
import { mongooseConnect } from "@/lib/mongodb";
import Profile from "@/models/Profile"; // Default import, uses "admin" collection
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await mongooseConnect(); // Connect to MongoDB
        console.log("Authorizing with credentials:", credentials);

        const { email, password } = credentials;

        // Find user in the "admin" collection using Profile model
        const user = await Profile.findOne({ email });
        if (!user) {
          console.log("No user found with email:", email);
          return null; // No user found, authentication fails
        }

        // Compare plaintext password with hashed password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          console.log("Invalid password for email:", email);
          return null; // Invalid password, authentication fails
        }

        console.log("User authenticated:", { id: user._id, email: user.email });
        // Return user object for session
        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
});