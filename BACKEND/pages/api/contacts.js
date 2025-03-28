import mongoose from "mongoose";
import { mongooseConnect } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

export default async function handler(req, res) {
    const { method } = req;

    try {
        await mongooseConnect();

        if (method === "POST") {
            const { name, email, phone, title, description } = req.body;
            const blogDoc = await Blog.create({
                name,
                email,
                phone,
                title,
                description,
            });
            res.status(201).json({ success: true, data: blogDoc });
        } else if (method === "GET") {
            if (req.query.id) {
                const blog = await Blog.findById(req.query.id);
                if (!blog) {
                    return res.status(404).json({ success: false, error: "Blog not found" });
                }
                res.json({ success: true, data: blog });
            } else {
                const blogs = await Blog.find();
                res.json({ success: true, data: blogs.reverse() });
            }
        } else if (method === "PUT") {
            const { name, email, phone, title, description  } = req.body;
            const updatedBlog = await Blog.findByIdAndUpdate(
                _id,
                { name, email, phone, title, description  },
                { new: true }
            );
            if (!updatedBlog) {
                return res.status(404).json({ success: false, error: "Blog not found" });
            }
            res.json({ success: true, data: updatedBlog });
        } else if (method === "DELETE") {
            if (req.query?.id) {
                const result = await Blog.deleteOne({ _id: req.query.id });
                if (result.deletedCount === 0) {
                    return res.status(404).json({ success: false, error: "Blog not found" });
                }
                res.json({ success: true, data: null });
            } else {
                res.status(400).json({ success: false, error: "ID is required" });
            }
        } else {
            res.status(405).json({ success: false, error: "Method not allowed" });
        }
    } catch (error) {
        console.error("API error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}