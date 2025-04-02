import mongoose, { Schema, models, model } from "mongoose";

const BlogSchema = new Schema(
    {
        title: { type: String },
        slug: { type: String, required: true },
        images: [{ type: String }],
        description: { type: String },
        blogCategory: [{ type: String }],
        tags: [{ type: String }],
        status: { type: String },
    },
    { timestamps: true }
);

export const Blog = models.Blog || model("Blog", BlogSchema, "blogs");