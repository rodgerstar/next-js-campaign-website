import Head from "next/head";
import {IoNewspaper} from "react-icons/io5";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";


export default function DeletePhoto() {

    const router = useRouter();
    const { id } = router.query;
    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/api/photos?id=' + id).then((response) => {
                setProductInfo(response.data.data);
            });
        }
    }, [id]);

    function goBack() {
        router.push("/gallery");
    }

    async function deleteBlog(blogId) {
        await axios.delete('/api/photos?id=' + blogId);
        toast.success("Photo Deleted Successfully");
        goBack();
    }

    return <>
            <Head>
                <title>Delete Photo</title>
            </Head>
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Delete {productInfo ? <span>{productInfo.title}</span> : "Blog"}</h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <IoNewspaper /><span>/</span><span>Delete Photo</span>
                    </div>
                </div>

                <div className="deletesec flex flex-center wh_100">
                    <div className="deletecard">
                        <svg
                            viewBox="0 0 32 24"
                            fill="red"
                            height="6em"
                            width="6em"
                        >
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            <path d="M24 6h2v10h-2zM24 18h2v2h-2z" />
                        </svg>
                        <p className="cookieHeading">Are You Sure?</p>
                        <p className="cookieDescription">
                            This will be permanently deleted from your photo content!
                        </p>
                        <div className="buttonContainer">
                            <button
                                onClick={() => deleteBlog(id)}
                                className="acceptButton"
                            >
                                Delete Blog
                            </button>
                            <button
                                onClick={goBack}
                                className="declineButton"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
}