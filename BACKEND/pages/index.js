import Head from "next/head";
import { Bar } from "react-chartjs-2";
import Loading from "@/components/Loading";
import { IoNewspaper } from "react-icons/io5";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import LoginLayout from "@/components/LoginLayout";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Home() {
    const [blogsData, setBlogsData] = useState([]);
    const [projectData, setProjectData] = useState([]);
    const [photoData, setPhotoData] = useState([]);
    const [loading, setLoading] = useState(true);

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Blogs Created Monthly Every Year" },
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/blogs");
                const responseProject = await fetch("/api/projects");
                const responseGallery = await fetch("/api/photos");

                const result = await response.json();
                const dataProject = await responseProject.json();
                const dataPhotos = await responseGallery.json();



                // Set data with validation similar to blogs
                const blogs = result.success && result.data ? result.data : [];
                const projects = dataProject.success && dataProject.data ? dataProject.data : [];
                const photos = dataPhotos.success && dataPhotos.data ? dataPhotos.data : [];

                setBlogsData(blogs);
                setProjectData(projects);
                setPhotoData(photos);


                setLoading(false);
            } catch (error) {
                console.error("Fetch error:", error);
                setBlogsData([]);
                setProjectData([]);
                setPhotoData([]);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Log state updates for debugging
    useEffect(() => {

    }, [blogsData, projectData, photoData]);

    const monthlyData = blogsData
        .filter((dat) => dat.status === "publish")
        .reduce((acc, blog) => {
            const date = new Date(blog.createdAt || blog.date);
            const year = date.getFullYear();
            const month = date.getMonth();
            acc[year] = acc[year] || Array(12).fill(0);
            acc[year][month]++;
            return acc;
        }, {});

    const years = Object.keys(monthlyData);
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const datasets = years.map((year) => ({
        label: `${year}`,
        data: monthlyData[year] || Array(12).fill(0),
        backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`,
    }));

    const data = { labels, datasets };

    if (loading) {
        return <Loading />;
    }

    const publishedProjects = projectData.filter((dat) => dat.status === "publish");

    return (
        <LoginLayout>
        <>
            <Head>
                <title>Portfolio Backend</title>
                <meta name="description" content="Blog website backend" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className="dashboard">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Admin <span>Dashboard</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <IoNewspaper /><span>/</span><span>Dashboard</span>
                    </div>
                </div>

                <div className="topfourcards flex flex-sb">
                    <div className="four_card">
                        <h2>Total News Blogs</h2>
                        <span>{blogsData.filter((dat) => dat.status === "publish").length}</span>
                    </div>
                    <div className="four_card">
                        <h2>Total Projects</h2>
                        <span>{publishedProjects.length}</span> {/* Changed to only "publish" */}
                    </div>
                    <div className="four_card">
                        <h2>Photos</h2>
                        <span>{photoData.length}</span>
                    </div>
                    <div className="four_card">
                        <h2>Donations(Ksh)</h2>
                        <span>N/A</span>
                    </div>
                </div>

                <div className="year_overview flex flex-sb">
                    <div className="leftyearoverview">
                        <div className="flex flex-sb">
                            <h3>Year Overview</h3>
                            <ul className="creative-dots">
                                <li className="big-dot"></li>
                                <li className="semi-big-dot"></li>
                                <li className="medium-dot"></li>
                                <li className="semi-medium-dot"></li>
                                <li className="small-dot"></li>
                                <li className="semi-small-dot"></li>
                            </ul>
                            <h3 className="text-right">
                                {blogsData.filter((dat) => dat.status === "publish").length} / 365days <br />
                                <span>Total Published News</span>
                            </h3>
                        </div>
                        <Bar data={data} options={options} />
                    </div>

                    <div className="right_salescont">
                        <div>
                            <h3 className="mb-1">News Blogs By Category</h3>
                            <ul className="creative-dots">
                                <li className="big-dot"></li>
                                <li className="semi-big-dot"></li>
                                <li className="medium-dot"></li>
                                <li className="semi-medium-dot"></li>
                                <li className="small-dot"></li>
                                <li className="semi-small-dot"></li>
                            </ul>
                        </div>
                        <div className="blogscategory flex flex-center">
                            <div className="scrollable-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Topics</th>
                                            <th>Data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Community News</td>
                                            <td>{blogsData.filter((dat) => dat.blogCategory?.includes("community-engagement")).length}</td>
                                        </tr>
                                        <tr>
                                            <td>Campaign News</td>
                                            <td>{blogsData.filter((dat) => dat.blogCategory?.includes("campaign-updates")).length}</td>
                                        </tr>
                                        <tr>
                                            <td>Youth News</td>
                                            <td>{blogsData.filter((dat) => dat.blogCategory?.includes("youth-employment")).length}</td>
                                        </tr>
                                        <tr>
                                            <td>Development News</td>
                                            <td>{blogsData.filter((dat) => dat.blogCategory?.includes("development-projects")).length}</td>
                                        </tr>
                                        <tr>
                                            <td>Women/Family News</td>
                                            <td>{blogsData.filter((dat) => dat.blogCategory?.includes("women-family")).length}</td>
                                        </tr>
                                        <tr>
                                            <td>Health and Education</td>
                                            <td>{blogsData.filter((dat) => dat.blogCategory?.includes("health-education")).length}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        </LoginLayout>
    );
}