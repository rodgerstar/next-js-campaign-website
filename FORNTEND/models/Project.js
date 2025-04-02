import mongoose, { Schema, models, model } from "mongoose";

const ProjectSchema = new Schema(
    {
        title: { type: String },
        slug: { type: String, required: true },
        images: [{ type: String }],
        description: { type: String },
        projectCategory: [{ type: String }],
        tags: [{ type: String }],
        status: { type: String },
    },
    { timestamps: true }
);

export const Project = models.Project || model("Project", ProjectSchema, "projects");