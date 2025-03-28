
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {IoNewspaper} from "react-icons/io5";

import Photo from "@/components/photo";

export default function EditPhoto() {

    const router = useRouter();
    const { id } = router.query; // id is a string with [id].js
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

    return <>

        <Head>
                <title>Update Blog</title>
            </Head>
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Edit {productInfo ? <span>{productInfo.title}</span> : "Blog"}</h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className='breadcrumb'>
                        <IoNewspaper/><span>/</span><span>Edit News Blog</span>
                    </div>
                </div>

                <div className='mt-3'>
                    {
                        productInfo && (
                            <Photo {...productInfo} />
                        )
                    }
                </div>
            </div>
    </>
}