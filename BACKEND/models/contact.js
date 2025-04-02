import mongoose, { Schema, models, model } from "mongoose";

const ContactSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        title: { type: String, required: true },
        area: { type: String },
        description: { type: String },
    },
    { timestamps: true }
);

export const Contact = models.Contact || model("Contact", ContactSchema, "contacts");