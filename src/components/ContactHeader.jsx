import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactHeader = () => {
  useGSAP(() => {
    // Set initial state
    gsap.set('.mask-clip-path', {
      width: '60vw',
      height: '70vh',
      borderRadius: '24px',
      rotation: -8,
      scale: 0.9,
      filter: 'brightness(0.8) contrast(1.1)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
    });

    gsap.set('.image-border', {
      opacity: 1,
      scale: 0.9,
      rotation: -8,
    });

    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=900 center",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        ease: "power2.inOut"
      }
    });

    clipAnimation
      .to('.mask-clip-path', {
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        rotation: 0,
        scale: 1,
        filter: 'brightness(1) contrast(1)',
        boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
        duration: 1,
        ease: "power2.inOut"
      })
      .to('.image-border', {
        opacity: 0,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "power2.inOut"
      }, 0.2);

    // Add parallax effect to the title
    gsap.to('.contact-title', {
      y: -100,
      opacity: 0.7,
      scrollTrigger: {
        trigger: "#clip",
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });

  }, []);

  return (
    <div className='bg-gradient-to-br from-gray-700  to-black min-h-[100vh] w-full flex flex-col items-center relative overflow-hidden'>
      <h1 className='md:contact-title special-font uppercase font-zentry font-black text-5xl mt-[5%] mb-[2%] sm:right-10 sm:text-7xl md:text-9xl lg:text-[18rem] text-white z-10 drop-shadow-lg'>
        C<b className="text-cyan-300">o</b>ntact Us
      </h1>
      
      <div className='h-dvh w-screen flex items-center justify-center' id="clip">
        {/* Decorative border element */}
        <div className='image-border absolute inset-0 flex items-center justify-center pointer-events-none z-20'>
          <div className='w-[60vw] h-[70vh] border-4 border-cyan-300/40 rounded-3xl backdrop-blur-sm shadow-2xl'></div>
        </div>
        
        {/* Main image container */}
        <div className='mask-clip-path relative overflow-hidden'>
          <img 
            src="img/contactHeader.webp" 
            alt="Background" 
            className='absolute left-0 top-0 size-full object-cover transition-transform duration-300' 
          />
          
          {/* Gradient overlay for depth */}
          <div className='absolute inset-0 bg-gradient-to-t from-indigo-900/30 via-transparent to-purple-900/20 pointer-events-none'></div>
          
          {/* Corner accent */}
          <div className='absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-cyan-300/60 opacity-80'></div>
          <div className='absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-cyan-300/60 opacity-80'></div>
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;