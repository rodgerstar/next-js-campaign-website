import Link from "next/link";

import { IoHome } from "react-icons/io5"
import {BsPostcard} from "react-icons/bs";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {MdOutlineWorkHistory} from "react-icons/md";
import {TfiGallery} from "react-icons/tfi";


export default function Aside() {

        const router = useRouter()

        const [clicked, setClicked] = useState(false);

        const [activeLink, setActiveLink] = useState('/');

        const handleClick = () => {
                setClicked(!clicked);
        }

        const handleLinkClick = (link) => {
                setActiveLink(preActive => (preActive === link ? null : link));
                setClicked(false);
        }

        useEffect(() => {
             // update active links state
             setActiveLink(router.pathname)
        }, [router.pathname])
   
  
        return <>
                <aside className="asideleft active">
                        <ul>
                                <Link href='/'>
                                        <li className='navactive'>
                                                <IoHome/>
                                                <span>Dashboard</span>
                                        </li>
                                </Link>
                                <li className={activeLink === '/blogs' ? 'navactive flex-col flex-left' : 'flex-col flex-left'}
                                    onClick={() => handleLinkClick('/blogs')}
                                >
                                        <div className='flex gap-1'>
                                                <BsPostcard/>
                                                <span>News</span>
                                        </div>
                                        {activeLink === '/blogs' && (
                                            <ul>
                                                    <Link href='/'>
                                                            <li>All News</li>
                                                    </Link>
                                                    <Link href='/'>
                                                            <li>Draft News</li>
                                                    </Link>
                                                    <Link href='/'>
                                                            <li>Add News</li>
                                                    </Link>
                                            </ul>
                                        )}
                                </li>
                                <li className={activeLink === '/projects' ? 'navactive flex-col flex-left' : 'flex-col flex-left'}
                                    onClick={() => handleLinkClick('/projects')}
                                >
                                        <div className='flex gap-1'>
                                                <MdOutlineWorkHistory/>
                                                <span>Projects</span>
                                        </div>
                                        {activeLink === '/projects' && (
                                            <ul>
                                                    <Link href='/'>
                                                            <li>All Projects</li>
                                                    </Link>
                                                    <Link href='/'>
                                                            <li>Draft Projects</li>
                                                    </Link>
                                                    <Link href='/'>
                                                            <li>Add Projects</li>
                                                    </Link>
                                            </ul>
                                        )}
                                </li>
                                <li className={activeLink === '/gallery' ? 'navactive flex-col flex-left' : 'flex-col flex-left'}
                                    onClick={() => handleLinkClick('/gallery')}
                                >
                                        <div className='flex gap-1'>
                                                <TfiGallery />
                                                <span>Gallery</span>
                                        </div>
                                        {activeLink === '/gallery' && (
                                            <ul>
                                                    <Link href='/'>
                                                            <li>All Photos</li>
                                                    </Link>
                                                    <Link href='/'>
                                                            <li>Add Photos</li>
                                                    </Link>
                                            </ul>
                                        )}
                                </li>
                                <Link href='/contacts'>
                                        <li className='navactive'>
                                                <IoHome/>
                                                <span>Dashboard</span>
                                        </li>
                                </Link>
                        </ul>
                </aside>
        </>


}