import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Spinner from "@/components/Spinner";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import { MdDelete } from "react-icons/md";

export default function Blog({
    _id,
    title: existingTitle,
    slug: existingSlug,
    images: existingImages,
    description: existingDescription,
    blogCategory: existingBlogCategory,
    tags: existingTags,
    status: existingStatus,


                             }) {
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle ||"");
    const [slug, setSlug] = useState(existingSlug || "");
    const [images, setImages] = useState(existingImages || []);
    const [description, setDescription] = useState(existingDescription || "");
    const [blogCategory, setBlogCategory] = useState(existingBlogCategory || []);
    const [tags, setTags] = useState(existingTags || []);
    const [status, setStatus] = useState(existingStatus || "");

    const [isUploading, setIsUploading] = useState(false);
    const [uploadImagesQueue, setUploadImagesQueue] = useState([]);

    async function createBlog(ev) {
        ev.preventDefault();
        if (isUploading) await Promise.all(uploadImagesQueue);

        const data = { title, slug, images, description, blogCategory, tags, status };

        try {
            if (_id) {
                await axios.put("/api/blogs", { ...data, _id });
                toast.success("News Blog Updated");
            } else {
                await axios.post("/api/blogs", data);
                toast.success("News Blog Created");
            }
            setRedirect(true);
            router.push("/blogs");
        } catch (error) {
            toast.error(`Failed to save blog: ${error.response?.data?.error || error.message}`);
        }
    }

    async function uploadImages(e) {
        const files = e.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const newQueue = [];
            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);
                newQueue.push(
                    axios.post("/api/upload", formData).then((res) => {
                        setImages((oldImages) => [...oldImages, ...res.data.links]);
                    })
                );
            }
            setUploadImagesQueue(newQueue);
            try {
                await Promise.all(newQueue);
                toast.success("Images Uploaded");
            } catch (error) {
                toast.error("Image upload failed: " + error.message);
            } finally {
                setIsUploading(false);
                setUploadImagesQueue([]);
            }
        } else {
            toast.error("No files selected. Please upload again!");
        }
    }

    function updateImagesOrder(images) {
        setImages(images);
    }

    function handleDeleteImage(index) {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        toast.success("Image Deleted");
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
                        <option value="environment-agriculture">Environment and Agriculture</option>
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
                        className='ql-container ql-editor'
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

                <div className="w-100 mt-2">
                    <button type="submit" className="w-100 addwebbtn flex-center" disabled={isUploading}>
                        SAVE NEWS
                    </button>
                </div>
            </form>
        </>
    );
}