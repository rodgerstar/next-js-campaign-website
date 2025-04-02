import mongoose, { Schema, models, model } from "mongoose";

const PhotosSchema = new Schema(
    {
        title: { type: String },
        slug: { type: String, required: true },
        images: [{ type: String }],
    },
    { timestamps: true }
);

export const Photos = models.Photos || model("Photos", PhotosSchema, "photos");