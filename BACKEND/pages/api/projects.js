import mongoose from "mongoose";
import { mongooseConnect } from "@/lib/mongodb";
import { Project } from "@/models/Project";

export default async function handler(req, res) {
    const { method } = req;

    try {
        await mongooseConnect();

        if (method === "POST" || method === "PUT") {
            const { title, slug, images, description, projectCategory, tags, status } = req.body;

            // Validate status
            if (typeof status !== "string" || !["draft", "publish"].includes(status)) {
                return res.status(400).json({
                    success: false,
                    error: "Status must be a string and either 'draft' or 'publish'",
                });
            }

            if (method === "POST") {
                const blogDoc = await Project.create({
                    title,
                    slug,
                    images,
                    description,
                    projectCategory,
                    tags,
                    status,
                });
                res.status(201).json({ success: true, data: blogDoc });
            } else if (method === "PUT") {
                const { _id } = req.body;
                const updatedBlog = await Project.findByIdAndUpdate(
                    _id,
                    { title, slug, images, description, projectCategory, tags, status },
                    { new: true }
                );
                if (!updatedBlog) {
                    return res.status(404).json({ success: false, error: "Project not found" });
                }
                res.json({ success: true, data: updatedBlog });
            }
        } else if (method === "GET") {
            if (req.query.id) {
                const blog = await Project.findById(req.query.id);
                if (!blog) {
                    return res.status(404).json({ success: false, error: "Project not found" });
                }
                res.json({ success: true, data: blog });
            } else {
                const blogs = await Project.find();
                res.json({ success: true, data: blogs.reverse() });
            }
        } else if (method === "DELETE") {
            if (req.query?.id) {
                const result = await Project.deleteOne({ _id: req.query.id });
                if (result.deletedCount === 0) {
                    return res.status(404).json({ success: false, error: "Project not found" });
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