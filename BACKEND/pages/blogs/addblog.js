import {IoNewspaper} from "react-icons/io5";
import Blog from "@/components/Blog";


export default function Addblog() {



    return <>
       <div className='addblogspage'>
           <div className='titledashboard flex flex-sb'>
               <div>
                   <h2>Add <span>News</span></h2>
                   <h3>ADMIN PANEL</h3>
               </div>
               <div className='breadcrumb'>
                   <IoNewspaper /><span>/</span><span>Add News</span>
               </div>
           </div>
           <div className='blogsadd'>
               <Blog/>
           </div>

       </div>
    </>
}