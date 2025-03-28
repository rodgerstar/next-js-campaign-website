import { IoNewspaper } from "react-icons/io5";
import useFetchData from "@/hooks/useFetchData";
import { useState } from "react";
import DataLoading from "@/components/DataLoading";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

export default function Projects() {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch project data
    const { alldata, loading } = useFetchData("/api/projects", { cache: "no-store" });

    // Pagination
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const allProjects = alldata ? alldata.length : 0;

    // Filter projects by search query
    const filteredProjects = searchQuery.trim() === ""
        ? (alldata || [])
        : (alldata || []).filter(project =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const indexOfFirstProject = (currentPage - 1) * perPage;
    const indexOfLastProject = currentPage * perPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    // Adjust status filter based on your data (e.g., show all or specific statuses)
    const visibleProjects = currentProjects; // Or filter: .filter(p => p.status === "Finished" || p.status === "OnGoing")

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allProjects / perPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>All Published <span>Projects</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <IoNewspaper />
                    <span>/</span>
                    <span>Projects</span>
                </div>
            </div>

            <div className="blogstable">
                <div className="flex gap-2 mb-1">
                    <h2>Search Projects</h2>
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
                        ) : visibleProjects.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center">
                                    No Projects Found!
                                </td>
                            </tr>
                        ) : (
                            visibleProjects.map((project, index) => (
                                <tr key={project._id}>
                                    <td>{indexOfFirstProject + index + 1}</td>
                                    <td><h3>{project.title}</h3></td>
                                    <td>
                                        {project.images[0] ? (
                                            <img src={project.images[0]} width={100} alt={project.title} />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td>
                                        <div className="flex gap-2 flex-center">
                                            <Link href={'/projects/edit/' + project._id}>
                                                <button><FaEdit /></button>
                                            </Link>
                                            <Link href={'/projects/delete/' + project._id}>
                                                <button><MdDeleteForever /></button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
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