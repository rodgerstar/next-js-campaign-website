import {IoNewspaper} from "react-icons/io5";

import Photo from "@/components/photo";


export default function addphoto() {



    return <>
        <div className='addblogspage'>
            <div className='titledashboard flex flex-sb'>
                <div>
                    <h2>Add <span>Photo</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className='breadcrumb'>
                    <IoNewspaper/><span>/</span><span>Add Photo</span>
                </div>
            </div>
            <div className='blogsadd'>
                <Photo/>
            </div>

        </div>
    </>

}