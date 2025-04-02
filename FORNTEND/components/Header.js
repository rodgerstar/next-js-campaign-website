import Link from "next/link";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoMoonSharp } from "react-icons/io5";
import { LuSun, LuSunMoon } from "react-icons/lu";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function Header() {




    // navlist active
    const router = useRouter();
    const [clicked, setClicked] = useState(false);
    const [activeLink, setActiveLink] = useState('/');

    const handleLinkClick = (link) => {
        setActiveLink(link)
        setClicked(false);
    }

    useEffect(() => {
        // update active state when the page is reloaded
        setActiveLink(router.pathname)
    }, [router.pathname]);

    //mobile navbar
    const [mobile, setMobile] = useState(false);

    //open
    const handleMobileOpen = () => {
        setMobile(!mobile);

    }

    //close
    const handleMobileClose = () => {
        setMobile(false);
    }


   
    return <>
        <header>
            <nav className=' container flex flex-sb'>
                <div className='logo flex gap-2'>
                    <Link href='/'><h1>OSORE E.</h1></Link>
                </div>
                <div className='navlist flex gap-2'>
                    <ul className='flex gap-2'>
                        <li>
                            <Link href='/' className='active'>Home</Link>
                        </li>
                        <li>
                            <Link href='/services'>My Vision</Link>
                        </li>
                        <li>
                            <Link href='/projects'>Projects</Link>
                        </li>
                        <li>
                            <Link href='/blogs'>News</Link>
                        </li>
                        <li>
                            <Link href='/gallery'>Gallery</Link>
                        </li>
                        <li>
                            <Link href='/contact' >Contact</Link>
                        </li>
                    </ul>
                    <div className='darkmodetoggle'>
                        <IoMoonSharp/>
                    </div>
                    <button><Link href='/contact'>Lets Talk</Link></button>
                    <div className='mobiletogglesvg' onClick={handleMobileOpen}>
                        <HiMiniBars3BottomRight/>
                    </div>
                </div>
                <div className={mobile ? 'mobilenavlist active' : 'mobilenavlist'}>
                    <span onClick={handleMobileClose} className={mobile ? 'active' : ''}></span>
                    <div className='mobilelogo'>
                        <h2>OSORE E.</h2>
                    </div>
                    <ul className='flex gap-1 flex-col flex-left mt-3' onClick={handleMobileClose}>
                        <li>
                            <Link href='/' onClick={() => handleLinkClick('/')} className={activeLink === '/' ? 'active' : '' }>Home</Link>
                        </li>
                        <li>
                            <Link href='/services' onClick={() => handleLinkClick('/services')} className={activeLink === '/services' ? 'active' : '' }>My Vision</Link>
                        </li>
                        <li>
                            <Link href='/projects' onClick={() => handleLinkClick('/projects')} className={activeLink === '/projects' ? 'active' : '' }>Projects</Link>
                        </li>
                        <li>
                            <Link href='/blogs' onClick={() => handleLinkClick('/blogs')} className={activeLink === '/blogs' ? 'active' : '' }>News</Link>
                        </li>
                        <li>
                            <Link href='/gallery' onClick={() => handleLinkClick('/gallery')} className={activeLink === '/gallery' ? 'active' : '' }>Gallery</Link>
                        </li>
                        <li>
                            <Link href='/contact' onClick={() => handleLinkClick('/contact')} className={activeLink === '/contact' ? 'active' : '' }>Contact</Link>
                        </li>
                    </ul>
                    <p className='text-center'>Copyright &copy; Osore E. Team 2025 <br/> Powered by NEXEL</p> <br/>
                    <p></p>
                </div>
            </nav>
        </header>

    </>
}