import Head from "next/head";
import {FaLinkedinIn, FaTiktok, FaTwitter} from "react-icons/fa";
import {CiFacebook} from "react-icons/ci";
import {FaFacebookF, FaXTwitter} from "react-icons/fa6";
import {GoArrowUpRight} from "react-icons/go";
import {useState} from "react";

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


  

  return (
    <>
      <Head>
        <title>Evans Osore - Makunga Isongo Malaha Ward 2027</title>
        <meta name="description" content="evans osore campaign website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
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
                          leadership is now. I’m ready to stand with you, walk with you, and work for you — because our
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
                    <p>By 2027, we will empower the youth, uplift women, improve infrastructure, and ensure better
                        access to healthcare, education, and job opportunities for all in our ward.</p>
                </div>
                <div className='services_menu'>
                    {vision.map((vision, index) => (
                        <div key={index} className={`services_item  ${activeIndex === 
                        index ? 'sactive' : '' }`}
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

        </section>

        {/* Experience study */}
        <section className="exstudy">

        </section>

        {/* My Skills */}
        <section className="myskills">

        </section>

        {/* Recent Blogs */}
        <section className="recentblogs">

        </section>

    </>
  );
}
