import { RiBarChartHorizontalFill } from "react-icons/ri";
import { BiExitFullscreen } from "react-icons/bi";
import { GoScreenFull } from "react-icons/go";
import { useState } from "react";

export default function Header({handleAsideOpen}) {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            // Enter fullscreen
            document.documentElement.requestFullscreen()
                .then(() => setIsFullScreen(true))
                .catch((err) => console.error("Fullscreen error:", err));
        } else {
            // Exit fullscreen
            document.exitFullscreen()
                .then(() => setIsFullScreen(false))
                .catch((err) => console.error("Exit fullscreen error:", err));
        }
    };

    return (
        <>
            <header className="header flex flex-sb">
                <div className="logo flex gap-2">
                    <h1>ADMIN</h1>
                    <div
                        onClick={handleAsideOpen}
                        className="headerham flex flex-center">
                        <RiBarChartHorizontalFill />
                    </div>
                </div>
                <div className="rightnav flex gap-2">
                    <div onClick={toggleFullScreen}>
                        {isFullScreen ? <BiExitFullscreen /> : <GoScreenFull />}
                    </div>
                    <div className='notification'>
                        <img src="/img/notification.png" alt="notification"/>
                    </div>
                    <div className='profilenav'>
                        <img src="/img/user.png" alt="user"/>
                    </div>
                </div>
            </header>
        </>
    );
}