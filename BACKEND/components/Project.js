import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import { MdDelete } from "react-icons/md";
import Spinner from "@/components/Spinner";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function Project({
    _id,
    title: existingTitle,
    slug: existingSlug,
    images: existingImages,
    description: existingDescription,
    projectCategory: existingProjectCategory,
    tags: existingTags,
    status: existingStatus,
}) {
    const [redirect, setRedirect] = useState(false);
    const [title, setTitle] = useState(existingTitle || "");
    const [slug, setSlug] = useState(existingSlug || "");
    const [images, setImages] = useState(existingImages || []);
    const [description, setDescription] = useState(existingDescription || "");
    const [projectCategory, setProjectCategory] = useState(existingProjectCategory || []);
    const [tags, setTags] = useState(existingTags || []);
    const [status, setStatus] = useState(existingStatus || "draft"); // Changed to string with default "draft"
    const [isUploading, setIsUploading] = useState(false);
    const [uploadImagesQueue, setUploadImagesQueue] = useState([]);

    const router = useRouter();

    useEffect(() => {
        if (redirect) {
            router.push("/projects");
        }
    }, [redirect, router]);

    async function createProject(ev) {
        ev.preventDefault();
        if (isUploading) {
            await Promise.all(uploadImagesQueue);
        }

        const data = { title, slug, images, description, projectCategory, tags, status };

        try {
            if (_id) {
                await axios.put("/api/projects", { ...data, _id });
                toast.success("Project Updated");
            } else {
                await axios.post("/api/projects", data);
                toast.success("Project Created");
            }
            setRedirect(true);
        } catch (error) {
            toast.error(`Failed to save project: ${error.response?.data?.error || error.message}`);
        }
    }

    async function uploadImages(e) {
        const files = e.target?.files;
        if (!files || files.length === 0) {
            toast.error("No files selected. Please upload again!");
            return;
        }

        setIsUploading(true);
        const newQueue = Array.from(files).map(file => {
            const formData = new FormData();
            formData.append("file", file);
            return axios.post("/api/upload", formData).then(res => {
                setImages(oldImages => [...oldImages, ...res.data.links]);
            });
        });

        setUploadImagesQueue(newQueue);

        try {
            await Promise.all(newQueue);
            toast.success("Images Uploaded");
        } catch (error) {
            toast.error(`Image upload failed: ${error.message}`);
        } finally {
            setIsUploading(false);
            setUploadImagesQueue([]);
        }
    }

    function updateImagesOrder(images) {
        setImages(images);
    }

    function handleDeleteImage(index) {
        setImages(prev => prev.filter((_, i) => i !== index));
        toast.success("Image Deleted");
    }

    const handleSlugChange = (e) => {
        const inputValue = e.target.value;
        const newSlug = inputValue.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        setSlug(newSlug);
    };

    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setProjectCategory(selectedOptions);
    };

    const handleTagChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setTags(selectedOptions);
    };

    return (
        <form className="addWebsiteform" onSubmit={createProject}>
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter Project Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="slug">Slug (SEO-friendly URL)</label>
                <input
                    type="text"
                    id="slug"
                    placeholder="enter-project-slug"
                    value={slug}
                    onChange={handleSlugChange}
                    required
                />
            </div>

            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="category">Project Categories (Ctrl + click for multiple)</label>
                <select
                    id="category"
                    multiple
                    value={projectCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="community-development">Community Development</option>
                    <option value="education-youth">Education & Youth</option>
                    <option value="health-wellness">Health & Wellness</option>
                    <option value="economic-growth">Economic Growth & Jobs</option>
                    <option value="environmental-sustainability">Environmental Sustainability</option>
                    <option value="public-safety">Public Safety & Justice</option>
                    <option value="women-family">Women & Family Empowerment</option>
                    <option value="campaign-updates">Campaign Promises & Updates</option>
                    <option value="infrastructure-technology">Infrastructure & Technology</option>
                    <option value="cultural-social">Cultural & Social Programs</option>
                </select>
            </div>

            <div className="w-100 flex flex-col flex-left mb-2">
                <div className="w-100">
                    <label htmlFor="fileinput">Images (first image will be used as thumbnail)</label>
                    <input
                        type="file"
                        id="fileinput"
                        className="mt-1"
                        accept="image/*"
                        multiple
                        onChange={uploadImages}
                    />
                </div>
                <div className="w-100 flex flex-left mt-1">{isUploading && <Spinner />}</div>
            </div>

            {!isUploading && (
                <div className="flex">
                    <ReactSortable
                        list={Array.isArray(images) ? images : []}
                        setList={updateImagesOrder}
                        animation={200}
                        className="flex gap-1"
                    >
                        {images?.map((link, index) => (
                            <div className="uploadedimg" key={link}>
                                <img src={link} alt="image" className="object-cover" />
                                <div className="deleteimg">
                                    <button type="button" onClick={() => handleDeleteImage(index)}>
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </div>
            )}

            <div className="description w-100 flex flex-col flex-left mb-2">
                <label htmlFor="description">News Content</label>
                <ReactQuill
                    className="ql-container ql-editor"
                    value={description}
                    onChange={setDescription}
                    placeholder="Write your news content here..."
                    modules={{
                        toolbar: [
                            [{ header: [1, 2, 3, false] }],
                            ["bold", "italic", "underline"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["link", "image"],
                            ["clean"],
                        ],
                    }}
                />
            </div>

            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="tags">Tags (Ctrl + click for multiple)</label>
                <select
                    id="tags"
                    multiple
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

            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                >
                    <option value="publish">Publish</option>
                    <option value="draft">Draft</option>
                </select>
            </div>

            <div className="w-100 mt-2">
                <button
                    type="submit"
                    className="w-100 addwebbtn flex-center"
                    disabled={isUploading}
                >
                    Save Project
                </button>
            </div>
        </form>
    );
}