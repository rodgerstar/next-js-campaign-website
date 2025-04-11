import mongoose, { Schema, models, model } from "mongoose";

const CommentSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        title: { type: String },
        contentpera: { type: String},
        maincontent: { type: Boolean },
        createdAt: { type: Date, default: Date.now },
        blog: {type: Schema.Types.ObjectId, ref: "Blog", required: true},
        parent: {type: Schema.Types.ObjectId, ref: "Comment"},
        children: {type: Schema.Types.ObjectId, ref: "Comment"},
        parentName: { type: String},
    },
    { timestamps: true }
);

export const Comment = models.Comment || model("Comment", CommentSchema, "comments");