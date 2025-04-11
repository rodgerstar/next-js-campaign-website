import Head from "next/head";
import {FaLinkedinIn, FaTiktok, FaTwitter} from "react-icons/fa";
import {CiFacebook} from "react-icons/ci";
import {FaFacebookF, FaXTwitter} from "react-icons/fa6";
import {GoArrowUpRight} from "react-icons/go";
import {useEffect, useState} from "react";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import {LuMedal} from "react-icons/lu";
import {PiGraduationCap} from "react-icons/pi";

export default function Home() {


    // active service background
    const [activeIndex, setActiveIndex] = useState(0);

    const handleHover = (index) => {
        setActiveIndex(index);
    }

    const handleMouseOut = () => {
        setActiveIndex(0);
    }


    // services data

    const vision = [
        {
            title: "Vision 2027: Empowering the Youth for a Brighter Future",
            description: "By 2027, we will prioritize empowering the youth, ensuring they have access to education, skills training, and job opportunities. We will create programs to address the youth bulge, with a focus on entrepreneurship, vocational training, and mentorship, enabling the next generation to thrive and contribute to the community."
        },
        {
            title: "Women and Family Empowerment: A Stronger Foundation for Our Society",
            description: "In 2027, we will focus on uplifting women and families by promoting equal opportunities in education, leadership, and business. By providing resources and support to women, we will foster a more inclusive society where families can thrive in a secure and supportive environment."
        },
        {
            title: "Improving Healthcare and Food Security for All",
            description: "Access to affordable healthcare and food security are fundamental rights. My vision for 2027 includes improving healthcare facilities, increasing access to essential services, and promoting local agriculture to ensure that every Kenyan has access to nutritious food, proper medical care, and a healthier life."
        },
        {
            title: "Lighting Up Communities and Small Markets",
            description: "My vision is to bring streetlights to small markets and rural communities, ensuring safety and creating an environment conducive to business growth and community development. These efforts will enhance trade, increase security, and improve the quality of life for everyone."
        },
        {
            title: "Supporting Bright, Needy Students to Achieve Their Dreams",
            description: "By 2027, I will implement a program that supports needy but bright students, helping them access upskilling opportunities and quality education. Through scholarships, mentorship programs, and partnerships with educational institutions, we will ensure every deserving student has the chance to succeed."
        }
    ];

    const [loading, setLoading] = useState(true)
    const [alldata, setAlldata] = useState([]);
    const [allWork, setAllWork] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectResponse, blogsResponse] = await fetch('/api/projects');
                const projectData = await projectResponse.json();
                const blogsData = await blogsResponse.json();
                setAlldata(projectData);
                setAlldata(blogsData)
            } catch (error) {
                console.error('Error fetching project data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // filter project based on selected category
        if (selectedCategory === 'All') {
            setFilteredProjects(alldata.filter(pro => pro.status === 'publish'))
        } else {
            setFilteredProjects(alldata.filter(pro => pro.status === 'publish' && pro.projectCategory[0] === selectedCategory))
        }

    }, [selectedCategory, alldata]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    }


    return (
        <>
            <Head>
                <title>Evans Osore - Makunga Isongo Malaha Ward 2027</title>
                <meta name="description" content="evans osore campaign website"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="shortcut icon" type="image/png" href="/favicon.png"/>
            </Head>

        {/* hero section */}
            <section className="hero">
                <div className='intro_text'>
                    <svg viewBox="0 0 1320 300">
                        <text x='50%' y='50%' textAnchor='middle' className='animate-stroke'>MCHAPA KAZI</text>
                    </svg>
                </div>
                <div className='container'>
                    <div className='flex w-100'>
                        <div className='heroinfoleft'>
                            <span className='hero_sb_title'>Your Voice, Your Power, Your Future.</span>
                            <h1 className='hero_title'>Elect Osore Evans.</h1>

                            <div className='hero_img_box heroimgbox'>
                                <img src="/img/evans.png" alt=""/>
                            </div>
                            <div className='lead '>
                                We’ve waited long enough for leaders who truly represent us. The time for real, honest
                                leadership is now. I’m ready to stand with you, walk with you, and work for you —
                                because our
                                community deserves
                                better. <span> Ahadi ni Matendo, Kuaminika, Kutenda na Kuleta Mabadiliko. </span>
                            </div>
                            <ul className='hero_social'>
                                <li>
                                    <a href="/"><FaXTwitter/></a>
                                </li>
                                <li>
                                    <a href="/"><FaFacebookF/></a>
                                </li>
                                <li>
                                    <a href="/"><FaTiktok/></a>
                                </li>
                                <li>
                                    <a href="/"><FaLinkedinIn/></a>
                                </li>
                            </ul>
                        </div>


                        {/*right side*/}
                        <div className='heroimageright'>
                            <div className='hero_img_box'>
                                <img src="/img/evans2.png" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className='funfect_area flex flex-sb'>
                        <div className='funfect_item'>
                            <h3>7+</h3>
                            <h4>years in <br/> public service.</h4>
                        </div>
                        <div className='funfect_item'>
                            <h3>5+</h3>
                            <h4>years of <br/> Driving Ward Change.</h4>
                        </div>
                        <div className='funfect_item'>
                            <h3>3+</h3>
                            <h4>years of <br/> talent empowerment.</h4>
                        </div>
                        <div className='funfect_item'>
                            <h3>2+</h3>
                            <h4>years in <br/> policy advisory roles.</h4>
                        </div>
                    </div>


                </div>
            </section>

        {/* Services */}
            <section className="services">
                <div className='container'>
                    <div className='services_titles'>
                        <h2>My Vision for Our Ward.</h2>
                        <p>By 2032, we will empower the youth, uplift women, improve infrastructure, and ensure better
                            access to healthcare, education, and job opportunities for all in our ward.</p>
                    </div>
                    <div className='services_menu'>
                        {vision.map((vision, index) => (
                            <div key={index} className={`services_item  ${activeIndex ===
                            index ? 'sactive' : ''}`}
                                 onMouseOver={() => handleHover(index)}
                                 onMouseOut={handleMouseOut}>
                                <div className='left_s_box'>
                                    <span>0{index + 1}</span>
                                    <h3>{vision.title}</h3>
                                </div>
                                <div className='right_s_box'>
                                    <p>{vision.description}</p>
                                </div>
                                <GoArrowUpRight/>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        {/* Projects */}
            <section className="projects">
                <div className='container'>
                    <div className='project_titles'>
                        <h2>My Work for the Community</h2>
                        <p>Driven by the needs of our people, I’m committed to projects that uplift lives, improve
                            infrastructure, and create real opportunities for growth in our ward.</p>
                    </div>
                    <div className='project_buttons projects_cards'>
                        <button className={selectedCategory === 'All' ? 'active' : ''}
                                onClick={() => setSelectedCategory
                                ('All')}>All
                        </button>
                        <button className={selectedCategory === 'education-youth' ? 'active' : ''}
                                onClick={() => setSelectedCategory
                                ('education-youth')}>Youth
                        </button>
                        <button className={selectedCategory === 'health-wellness' ? 'active' : ''}
                                onClick={() => setSelectedCategory
                                ('health-wellness')}>Health
                        </button>
                        <button className={selectedCategory === 'women-family' ? 'active' : ''}
                                onClick={() => setSelectedCategory
                                ('women-family')}>Elderly
                        </button>
                        <button className={selectedCategory === 'public-safety' ? 'active' : ''}
                                onClick={() => setSelectedCategory
                                ('public-safety')}>Security
                        </button>
                        <button className={selectedCategory === 'economic-growth' ? 'active' : ''}
                                onClick={() => setSelectedCategory
                                ('economic-growth')}>Jobs
                        </button>
                        <button className={selectedCategory === 'community-development' ? 'active' : ''}
                                onClick={() => setSelectedCategory
                                ('community-development')}>Community
                        </button>
                        <button className={selectedCategory === 'infrastructure-technology' ? 'active' : ''}
                                onClick={() => setSelectedCategory
                                ('infrastructure-technology')}>Infrastructure
                        </button>
                    </div>
                    <div className='projects_cards'>
                        {loading ? <div className='flex flex-center wh_50'><Spinner/></div> : (
                            filteredProjects.length === 0 ? (<h1>No Projects Found!</h1>) : (
                                filteredProjects.slice(0, 4).map((pro) => (
                                    <Link href='/' key={pro._id} className='procard'>
                                        <div className='proimgbox'>
                                            <img src={pro.images[0]} alt={pro.title}/>
                                        </div>
                                        <div className='procontentbox'>
                                            <h2>{pro.title}</h2>
                                            <GoArrowUpRight/>
                                        </div>
                                    </Link>
                                ))
                            )
                        )}

                    </div>
                </div>


            </section>

        {/* Experience study */}
            <section className="exstudy">
                <div className='container flex flex-left flex-sb'>
                    <div className='experience'>
                        <div className='experience_title flex gap-1'>
                            <LuMedal/>
                            <h2>My Journey</h2>
                        </div>
                        <div className='exper_cards'>
                            <div className='exper_card'>
                                <span>2019 - Present</span>
                                <h3>Local Youth Empowerment Initiative</h3>
                                <p>Coordinated vocational training programs for over 200 youths, focusing on masonry,
                                    carpentry, and agribusiness.</p>
                            </div>

                            <div className='exper_card'>
                                <span>2016 - 2019</span>
                                <h3>Community Health Volunteer (CHV) Program</h3>
                                <p>Worked closely with local clinics and CHVs to improve access to maternal health and
                                    wellness education in rural villages.</p>
                            </div>

                            <div className='exper_card'>
                                <span>2014 - 2016</span>
                                <h3>Ward Development Committee</h3>
                                <p>Served as a member representing youth and women’s interests in development planning
                                    and public resource allocation.</p>
                            </div>

                            <div className='exper_card'>
                                <span>2011 - 2014</span>
                                <h3>Rural Education Outreach Program</h3>
                                <p>Volunteered as a mentor and fundraiser for school lunch programs, uniforms, and
                                    infrastructure improvements in local primary schools.</p>
                            </div>
                        </div>
                    </div>

                    <div className='education'>
                        <div className='experience_title flex gap-1'>
                            <PiGraduationCap/>
                            <h2>My Education Journey</h2>
                        </div>
                        <div className='exper_cards'>
                            <div className='exper_card'>
                                <span>2020</span>
                                <h3>Short Course in  Governance</h3>
                                <p>Completed at the Center for Civic Education – equipped with skills in policy-making,
                                    budgeting, and effective public engagement.</p>
                            </div>

                            <div className='exper_card'>
                                <span>2015 - 2017</span>
                                <h3>Diploma in Community Development</h3>
                                <p>Kenya Institute of Social Work – learned strategies for mobilizing community
                                    resources and supporting local initiatives.</p>
                            </div>

                            <div className='exper_card'>
                                <span>2011 - 2014</span>
                                <h3>KCSE – St. Mary's High School</h3>
                                <p>Graduated with strong participation in leadership clubs, debates, and community
                                    outreach activities.</p>
                            </div>

                            <div className='exper_card'>
                                <span>Ongoing</span>
                                <h3>Workshops & Trainings</h3>
                                <p>Regularly attends county and national leadership forums to stay updated on policies
                                    and development tools affecting grassroots communities.</p>
                            </div>
                        </div>
                    </div>

                </div>

            </section>

            {/*/!* My Skills *!/*/}
            {/*<section className="myskills">*/}

            {/*</section>*/}

            {/* Recent Blogs */}
            <section className="recentblogs">
                <div className='container'>
                    <div className='myskills_title'>
                        <h2>
                            Recent Blogs
                        </h2>
                        <p>Stay updated with my latest thoughts, community stories, and development highlights from around the ward.</p>
                    </div>
                </div>
                <div className='recent_blogs'>
                    {allWork.slice(0, 3).map((blog) => {
                        return <Link href={`/blogs/${blog.slug}`} key={blog._id} className='re_blog'>
                            <div className='re_blogimg'>
                                <img src={blog.images[0] || '/img/noimage.png'} alt=""/>
                            </div>
                        </Link>

                    })}
                </div>
            </section>

        </>
    );
}
