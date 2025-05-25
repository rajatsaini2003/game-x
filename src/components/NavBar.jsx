import React, { useEffect, useRef, useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';
const NavbarLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About Us",
    path: "/about",
  },
  {
    title: "Contact Us",
    path: "/contact",
  },
];
const NavBar = () => {
    const navContainer = useRef(null);
    const audioElement = useRef(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndictorVisible, setIsIndicatorVisible] = useState(false);
    const [lastScrolledY, setLastScrolledY] = useState(0);
    const [isNavVisisble, setIsNavVisible] = useState(true);
    const{y:currentScrollY} = useWindowScroll();
    const location = useLocation();
    const matchRoute =(route)=>{
        return matchPath({path: route}, location.pathname);
    }
    const toggleAudioIndicator = () => {
        setIsAudioPlaying(!isAudioPlaying);
        setIsIndicatorVisible(!isIndictorVisible);
    }
    useEffect(() => {
        setIsAudioPlaying(false);
        setIsIndicatorVisible(false);
    }, [location.pathname]);
     useEffect(() => {
        // Only handle audio if we're on the home page
        if (matchRoute("/")) {
            if (isAudioPlaying && audioElement.current) {
                audioElement.current.play();
            } else if (audioElement.current) {
                audioElement.current.pause();
            }
        }

        // Cleanup function
        return () => {
            if (audioElement.current) {
                audioElement.current.pause();
            }
        };
    }, [isAudioPlaying, location.pathname]) 

    useEffect(() => {
        if(currentScrollY ===0){
            setIsNavVisible(true);
            navContainer.current.classList.remove('floating-nav');
            setLastScrolledY(0);
        }
        else if(currentScrollY > lastScrolledY){
            setIsNavVisible(false);
            navContainer.current.classList.add('floating-nav');
        }
        else if(currentScrollY < lastScrolledY){
            setIsNavVisible(true);
            navContainer.current.classList.add('floating-nav');
        }
        setLastScrolledY(currentScrollY);
    },[currentScrollY,lastScrolledY])

    useEffect(() => {
        gsap.to(navContainer.current, {
            y: isNavVisisble ? 0 : -100,
            opacity: isNavVisisble ? 1 : 0,
            duration: 0.2,
        })
    }, [isNavVisisble]);


  return (
    
    <div ref={navContainer} className=' fixed inset-x-0 top-4 z-50 h-16 flex
    border-none transition-all duration-700 sm:inset-x-6 '>
        <header className='absolute top-1/2 w-full -translate-y-1/2'>
            <nav className='flex size-full items-center justify-between p-4'>
                {/* Logo and Product button */}
                <div className='flex items-center gap-7'>
                    <img src='/img/logo.png' alt='logo'
                    className='w-10 ' />
                    <Link
                    to={'/about'}
                    >
                        <Button
                        id="product-button"
                        title="Products"
                        rightIcon={<TiLocationArrow/>}
                        containerClass="bg-blue-50 md:flex hidden item-center justify-center gap-1"
                        />
                    </Link>
                    
                </div>
                {/* Navigation Links and Audio Button */}
                <div className='flex h-full items-center'>
                    <div className='hidden md:block'>
                        {NavbarLinks.map((item) => {
                            return (
                                <Link 
                                className='nav-hover-btn'
                                key={item.path}
                                to={item.path}>
                                    {item.title}
                                </Link>
                            )
                        })}
                    </div>
                    { matchRoute("/") && (
                    <button className='ml-10 flex items-center space-x-0.5 cursor-pointer h-5 w-4'
                    onClick={toggleAudioIndicator}>
                        <audio ref={audioElement}
                         src="/audio/loop.mp3" 
                         className='hidden'
                        />
                        {[1, 2, 3, 4].map((bar) => (
                            <div
                            key={bar}
                            className={`indicator-line ${isIndictorVisible ? 'active' : ' '}`}
                            style={{
                                animationDelay: `${bar * 0.1}s`,
                            }}
                            />
                        ))}
                    </button>
                    )}

                </div>
            </nav>
        </header>
      
    </div>
  )
}

export default NavBar
