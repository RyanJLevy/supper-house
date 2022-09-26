import React, { useRef, useState } from 'react'
import About from './About/About';
import Events from './Events/Events';
import Footer from './Footer';
import Navbar from './Navigation/Navbar'
import ScrollToTop from './Navigation/ScrollToTop';
import Sidebar from './Navigation/Sidebar';
import Partnerships from './Partnerships/Partnerships';

function Main() {
    const [ sideMenuToggled, setSideMenuToggle ] = useState(false);
    const HandleMenuClick = () => {
        setSideMenuToggle(prevState => !prevState);
    };
    // Website theme.
    const [mode, setMode] = useState('light');
    const HandleModeToggle = () => {
        document.documentElement.classList.toggle('dark');
        setMode(prev => prev === 'light' ? 'dark' : 'light');
    }

    // Section scrolling.
    const topSectionRef = useRef();

    const scrollToSection = (element) => {
        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });
        setSideMenuToggle(false);
    }

    return (
        <main className='w-full h-full relative dark:bg-supper-black'>
            {sideMenuToggled && <div className=' z-[99] absolute top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-25'></div>}
            <Navbar handleClick={HandleMenuClick} handleNavClick={scrollToSection} mode={mode} handleModeToggle={HandleModeToggle}/>
            {sideMenuToggled && <Sidebar scrollToSection={scrollToSection} setSideMenuToggle={setSideMenuToggle} menuToggled={sideMenuToggled} mode={mode} handleModeToggle={HandleModeToggle} />}
            <div className='w-full flex flex-col items-center justify-between py-12' ref={ topSectionRef }>
                <h1 className="title-text text-center">welcome home.</h1>
            </div>
            <Events />
            <About />
            <Partnerships />
            <ScrollToTop mainSection={topSectionRef} scrollToTop={scrollToSection}/>
            <Footer />
        </main>
    )
}

export default Main