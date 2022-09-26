import { UserIcon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react';

function Sidebar(props) {
    const popupRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (props.menuToggled) {
                if (popupRef.current && !popupRef.current.contains(event.target) && !event.target.classList.contains('hamburger')) {
                    props.setSideMenuToggle(false);
                }
            }
        };

        window.addEventListener('click', handleClickOutside);
    }, [popupRef, props]);

    const HandleSectionClick = (elementID) => {
        props.setSideMenuToggle(false);
        props.scrollToSection(document.querySelector(elementID));
    }

    return (
        <nav className='absolute top-0 right-0 rounded-md bg-supper-pink z-[100]' ref={ popupRef }>
            <div className='flex flex-col items-center relative pt-10'>
                <XCircleIcon className='w-8 absolute top-2 right-4 text-white hover:bg-supper-pink-dark p-1 py-0 rounded-sm' onClick={() => props.setSideMenuToggle(false)} />
                <ul className='w-full flex flex-col items-center'>
                    <li className='w-full py-6 px-24 cursor-pointer text-center hover:bg-supper-pink-dark text-white' onClick={() => HandleSectionClick('#events-section')}>events</li>
                    <li className='w-full py-6 px-24 cursor-pointer text-center hover:bg-supper-pink-dark text-white' onClick={() => HandleSectionClick('#about-section')}>people</li>
                    <li className='w-full py-6 px-24 cursor-pointer text-center hover:bg-supper-pink-dark text-white' onClick={() => HandleSectionClick('#partners-section')}>partners</li>
                </ul>
                <div className='w-full flex justify-center items-center space-x-4 border-t-[1px] border-t-supper-pink-dark py-6'>
                    <button className='py-2 px-4 rounded-md hover:bg-black hover:bg-opacity-[0.15]'>
                        <UserIcon className='text-white w-6' />
                    </button>
                    <button className='py-2 px-4 rounded-md hover:bg-black hover:bg-opacity-[0.15]' onClick={props.handleModeToggle} title="Toggle between Light/Dark Mode.">
                        {props.mode === 'light' ? <SunIcon className='text-white w-6' /> : <MoonIcon className='text-white w-6' />}   
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar