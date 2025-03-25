import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Spinner from "@/components/Spinner";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";

export default function Blog({ _id }) {
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState("");
    const [blogCategory, setBlogCategory] = useState([]);
    const [tags, setTags] = useState([]);
    const [status, setStatus] = useState("");

    const [isUploading, setIsUploading] = useState(false);

    async function createBlog(ev) {
        ev.preventDefault();

        const data = { title, slug, images, description, blogCategory, tags, status };

        try {
            if (_id) {
                // Update existing blog
                await axios.put("/api/blogs", { ...data, _id });
                toast.success("News Blog Updated");
            } else {
                // Create new blog
                await axios.post("/api/blogs", data);
                toast.success("News Blog Created");
            }
            setRedirect(true);
            router.push("/blogs"); // Redirect after success
        } catch (error) {
            toast.error(`Failed to save blog: ${error.response?.data?.error || error.message}`);
        }
    }

    const handleSlugChange = (e) => {
        const inputValue = e.target.value;
        const newSlug = inputValue.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        setSlug(newSlug);
    };

    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setBlogCategory(selectedOptions);
    };

    const handleTagChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setTags(selectedOptions);
    };

    return (
        <>
            <form action="" className="addWebsiteform" onSubmit={createBlog}>
                {/* Blog Title */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter Small Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Blog Slug */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="slug">Slug (SEO-friendly URL)</label>
                    <input
                        type="text"
                        id="slug"
                        placeholder="Enter Slug URL"
                        value={slug}
                        onChange={handleSlugChange}
                    />
                </div>

                {/* Blog Category */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="category">Select Category (Ctrl + click for multiple)</label>
                    <select
                        name="category"
                        id="category"
                        multiple
                        value={blogCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="community-engagement">Community Engagement</option>
                        <option value="development-projects">Development Projects</option>
                        <option value="health-education">Health and Education</option>
                        <option value="youth-employment">Youth and Employment</option>
                        <option value="campaign-updates">Campaign Updates</option>
                        <option value="women-family">Women and Family Welfare</option>
                        <option value="security-safety">Security and Safety</option>
                        <option value="environment-agriculture">Environment and Agriculture</option>
                    </select>
                </div>

                {/* Blog Image */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <div className="w-100">
                        <label htmlFor="fileinput">Images (first image will be used as thumbnail)</label>
                        <input
                            type="file"
                            id="fileinput"
                            className="mt-1"
                            accept="image/*"
                            multiple
                            onChange={(e) => setImages(Array.from(e.target.files))}
                        />
                    </div>
                    <div className="w-100 flex flex-left mt-1">{isUploading && <Spinner />}</div>
                </div>

                {/* Markdown Description */}
                <div className="description w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="description">News Content</label>
                    <MarkdownEditor
                        id="description"
                        style={{ width: "100%", height: "400px" }}
                        placeholder="Write your news content here..."
                        value={description}
                        onChange={({ text }) => setDescription(text)} // Fixed onChange
                    />
                </div>

                {/* Tags */}
                <div className="tags w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="tags">Tags (Ctrl + click for multiple)</label>
                    <select
                        name="tags"
                        id="tags"
                        multiple
                        className="w-100 p-2"
                        value={tags}
                        onChange={handleTagChange}
                    >
                        <option value="water-access">Water Access</option>
                        <option value="roads">Roads</option>
                        <option value="electricity">Electricity</option>
                        <option value="sanitation">Sanitation</option>
                        <option value="security">Security</option>
                        <option value="youth">Youth</option>
                        <option value="women">Women</option>
                        <option value="education">Education</option>
                        <option value="health">Health</option>
                        <option value="elderly">Elderly</option>
                        <option value="rally">Rally</option>
                        <option value="endorsement">Endorsement</option>
                        <option value="voter-education">Voter Education</option>
                        <option value="manifesto">Manifesto</option>
                        <option value="volunteers">Volunteers</option>
                        <option value="jobs">Jobs</option>
                        <option value="agriculture">Agriculture</option>
                        <option value="environment">Environment</option>
                        <option value="market">Market</option>
                        <option value="launch">Launch</option>
                        <option value="meeting">Meeting</option>
                        <option value="celebration">Celebration</option>
                    </select>
                </div>

                {/* Status */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="status">Status</label>
                    <select
                        name="status"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">No Select</option>
                        <option value="draft">Draft</option>
                        <option value="publish">Publish</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="w-100 mt-2">
                    <button type="submit" className="w-100 addwebbtn flex-center">
                        SAVE NEWS
                    </button>
                </div>
            </form>
        </>
    );
}