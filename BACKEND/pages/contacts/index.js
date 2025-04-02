import { IoNewspaper } from "react-icons/io5";
import useFetchData from "@/hooks/useFetchData";
import { useState } from "react";
import DataLoading from "@/components/DataLoading";
import Link from "next/link";
import {FaEdit, FaRegEye} from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";

export default function contacts() {

     // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);

    // search
    const [searchQuery, setSearchQuery] = useState("");

    // fetch blog data
    const { alldata, loading } = useFetchData("/api/contacts");

    // function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // total number of blogs (corrected to handle undefined alldata)
    const allblog = alldata ? alldata.length : 0;

    // FILTER ALL DATA BASED ON SEARCH QUERY (corrected to handle undefined alldata)
    const filteredBlogs = searchQuery.trim() === ""
        ? (alldata || [])
        : (alldata || []).filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()));

    // calculate index of the first blog displayed on current page
    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastBlog = currentPage * perPage;

    // get the current page blog
    const currentBlog = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const publishedBlogs = currentBlog

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }

    return <>
        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>
                        All Contacts <span>Info</span>
                    </h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <IoNewspaper/>
                    <span>/</span>
                    <span>Contacts</span>
                </div>
            </div>
            <div className="blogstable">
                <div className="flex gap-2 mb-1">
                    <h2>Search Contacts</h2>
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <table className="table table-styling">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Email</th>
                        <th>Title</th>
                        <th>Phone No</th>
                        <th>Area</th>
                        <th>Open Contact</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr>
                            <td>
                                <DataLoading/>
                            </td>
                        </tr>
                    ) : (
                        <>
                            {publishedBlogs.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center">
                                        No Contact Found!
                                    </td>
                                </tr>
                            ) : (
                                publishedBlogs.map((blog, index) => (
                                    <tr key={blog._id}>
                                        <td>{indexOfFirstBlog + index + 1}</td>
                                        <td><h3>{blog.name}</h3></td>
                                        <td><h3>{blog.email}</h3></td>
                                        <td><h3>{blog.title}</h3></td>
                                        <td><h3>{blog.phone}</h3></td>
                                        <td><h3>{blog.area}</h3></td>
                                        <td>
                                            <div className='flex gap-2 flex-center'>
                                                <Link href={'/contacts/view/' + blog._id}>
                                                    <button><FaRegEye/></button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </>
                    )}
                    </tbody>
                </table>
                {/*for pagination*/}
                {publishedBlogs.length === 0 ? ("") : (
                    <div className='blogpagination'>
                        <button onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                        >Previous
                        </button>
                        {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                            <button
                                onClick={() => paginate(number)}
                                className={`${currentPage === currentPage ? "active" : ""}`}
                                key={number}>

                                {number}
                            </button>
                        ))}
                        <button onClick={() => paginate(currentPage + 1)} disabled={currentBlog.length < perPage}>Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    </>
}