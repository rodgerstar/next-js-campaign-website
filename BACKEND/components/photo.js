
import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import {ReactSortable} from "react-sortablejs";
import {MdDelete} from "react-icons/md";
import Spinner from "@/components/Spinner";


export default function Photo({
                                  _id,
                                  title: existingTitle,
                                  slug: existingSlug,
                                  images: existingImages,
                              }) {
    const [redirect, setRedirect] = useState(false);
    const [title, setTitle] = useState(existingTitle || "");
    const [slug, setSlug] = useState(existingSlug || "");
    const [images, setImages] = useState(existingImages || []);

    const [isUploading, setIsUploading] = useState(false);
    const [uploadImagesQueue, setUploadImagesQueue] = useState([]);

    const router = useRouter();

    useEffect(() => {
        if (redirect) {
            router.push("/gallery");
        }
    }, [redirect, router]);

    async function createProject(ev) {
        ev.preventDefault();
        if (isUploading) {
            await Promise.all(uploadImagesQueue);
        }

        const data = {title, slug, images};

        try {
            if (_id) {
                await axios.put("/api/photos", {...data, _id});
                toast.success("Photos Updated");
            } else {
                await axios.post("/api/photos", data);
                toast.success("Photo Created");
            }
            setRedirect(true);
        } catch (error) {
            toast.error(`Failed to save photos: ${error.response?.data?.error || error.message}`);
        }
    }

    // Rest of your functions (uploadImages, updateImagesOrder, etc.) remain unchanged
    async function uploadImages(e) {
        const files = e.target?.files;
        if (!files || files.length === 0) {
            toast.error("No photos selected. Please upload again!");
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



    return (
        <form className="addWebsiteform" onSubmit={createProject}>
            {/* Your form JSX remains unchanged */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter Photo Title"
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
                    placeholder="enter-photo-slug"
                    value={slug}
                    onChange={handleSlugChange}
                    required
                />
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
                <div className="w-100 flex flex-left mt-1">{isUploading && <Spinner/>}</div>
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
                                <img src={link} alt="image" className="object-cover"/>
                                <div className="deleteimg">
                                    <button type="button" onClick={() => handleDeleteImage(index)}>
                                        <MdDelete/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </div>
            )}



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