import { IoNewspaper } from "react-icons/io5";
import useFetchData from "@/hooks/useFetchData";
import { useState } from "react";
import DataLoading from "@/components/DataLoading";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

export default function DraftBlogs() {
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);

    // Search
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch blog data
    const { alldata, loading } = useFetchData("/api/blogs", { cache: "no-store" });

    // Function to handle page change
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Total number of blogs
    const allBlogs = alldata ? alldata.length : 0;

    // Filter blogs based on search query
    const filteredBlogs = searchQuery.trim() === ""
        ? (alldata || [])
        : (alldata || []).filter(blog =>
            blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

    // Calculate pagination indices
    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastBlog = currentPage * perPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // Filter for draft blogs
    const draftBlogs = currentBlogs.filter(blog => blog.status === "draft");

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allBlogs / perPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>
                        Draft <span>News</span>
                    </h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <IoNewspaper />
                    <span>/</span>
                    <span>Draft News</span>
                </div>
            </div>
            <div className="blogstable">
                <div className="flex gap-2 mb-1">
                    <h2>Search Draft News</h2>
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                <table className="table table-styling">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4}>
                                    <DataLoading />
                                </td>
                            </tr>
                        ) : (
                            <>
                                {draftBlogs.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center">
                                            No Draft News Found!
                                        </td>
                                    </tr>
                                ) : (
                                    draftBlogs.map((blog, index) => (
                                        <tr key={blog._id}>
                                            <td>{indexOfFirstBlog + index + 1}</td>
                                            <td>
                                                {blog.images[0] ? (
                                                    <img src={blog.images[0]} width={100} alt={blog.title} />
                                                ) : (
                                                    "No Image"
                                                )}
                                            </td>
                                            <td><h3>{blog.title}</h3></td>
                                            <td>
                                                <div className="flex gap-2 flex-center">
                                                    <Link href={`/blogs/edit/${blog._id}`}>
                                                        <button><FaEdit /></button>
                                                    </Link>
                                                    <Link href={`/blogs/delete/${blog._id}`}>
                                                        <button><MdDeleteForever /></button>
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
                {pageNumbers.length > 1 && (
                    <div className="pagination mt-2">
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={currentPage === number ? "active" : ""}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}