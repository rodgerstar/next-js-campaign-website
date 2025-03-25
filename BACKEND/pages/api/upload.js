import cloudinary from "cloudinary";
import { mongooseConnect } from "@/lib/mongodb";
import multiparty from "multiparty";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function uploadImage(req, res) {
    await mongooseConnect(); // Optional, remove if not needed here

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const form = new multiparty.Form();
        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                resolve({ fields, files });
            });
        });

        const links = [];
        for (const file of files.file) {
            const result = await cloudinary.v2.uploader.upload(file.path, {
                folder: "admin",
                public_id: `file_${Date.now()}`,
                resource_type: "auto",
            });

            const link = result.secure_url; // Fixed typo: result instead of results
            links.push(link);
        }

        return res.json({ links }); // Return { links: [...] }
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ error: error.message });
    }
}

export const config = {
    api: { bodyParser: false }, // Required for multiparty
};