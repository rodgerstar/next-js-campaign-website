import Head from "next/head";
import {FaLinkedinIn, FaTiktok, FaTwitter} from "react-icons/fa";
import {CiFacebook} from "react-icons/ci";
import {FaFacebookF, FaXTwitter} from "react-icons/fa6";

export default function Home() {



  // services data
  const services = [
    {
      title: "Web Development",
      description: "I am very good in web development offering services, I offer reliable web development services to generate the most remarkable results which your business need."
    },
    {
      title: "Mobile Development",
      description: "Experienced mobile developer offering innovative solutions. Proficient in creating high-performance, user-centric mobile apps. Expertise in iOS, Android, and cross-platform development."
    },
    {
      title: "Digital Marketing(SEO)",
      description: "My digital marketing services will take your business to the next level, we offer remarkable digital marketing strategies that drives traffic to your website, your business, and improves your brand awareness to potential customers."
    },
    {
      title: "Content Creator",
      description: "Passionate photographer and videographer capturing moments with creativity. Transforming visions into visual stories. Expert in visual storytelling, skilled in both photography and videography to deliver captivating content."
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
                          We’ve waited long enough for leaders who truly represent us. The time for real, honest leadership is now. I’m ready to stand with you, walk with you, and work for you — because our community deserves better. <span > Ahadi ni Matendo, Kuaminika, Kutenda na Kuleta Mabadiliko. </span>
                      </div>
                      <ul className='hero_social'>
                          <li>
                              <a href="/"><FaXTwitter /></a>
                          </li>
                          <li>
                              <a href="/"><FaFacebookF /></a>
                          </li>
                          <li>
                              <a href="/"><FaTiktok /></a>
                          </li>
                          <li>
                              <a href="/"><FaLinkedinIn /></a>
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


          </div>
      </section>

        {/* Services */}
      <section className="services">
        
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
