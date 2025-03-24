import Link from "next/link";

import { IoHome } from "react-icons/io5"
import {BsPostcard} from "react-icons/bs";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {MdAdminPanelSettings, MdOutlineWorkHistory} from "react-icons/md";
import {TfiGallery} from "react-icons/tfi";
import {TiContacts} from "react-icons/ti";


export default function Aside({asideOpen, handleAsideOpen}) {

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
                <aside className={asideOpen ? 'asideleft active' : 'asideleft'}>
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
                                                    <Link href='/blogs'>
                                                            <li>All News</li>
                                                    </Link>
                                                    <Link href='/blogs/draft'>
                                                            <li>Draft News</li>
                                                    </Link>
                                                    <Link href='/blogs/addblog'>
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
                                                    <Link href='/projects'>
                                                            <li>All Projects</li>
                                                    </Link>
                                                    <Link href='/projects/draftprojects'>
                                                            <li>Draft Projects</li>
                                                    </Link>
                                                    <Link href='/projects/addproject'>
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
                                                    <Link href='/gallery'>
                                                            <li>All Photos</li>
                                                    </Link>
                                                    <Link href='/gallery/addphoto'>
                                                            <li>Add Photos</li>
                                                    </Link>
                                            </ul>
                                        )}
                                </li>
                                <Link href='/contacts'>
                                        <li className={activeLink === '/contact' ? 'navactive' : ''} onClick={() => handleLinkClick('/contact')}>
                                                <TiContacts />
                                                <span>Contact</span>
                                        </li>
                                </Link>
                                <Link href='/setting'>
                                        <li className={activeLink === '/setting' ? 'navactive' : ''} onClick={() => handleLinkClick('/setting')}>
                                                <MdAdminPanelSettings />
                                                <span>Setting</span>
                                        </li>
                                </Link>
                        </ul>
                        <button className='logoutbtn'>
                               Logout
                        </button>
                </aside>
        </>


}