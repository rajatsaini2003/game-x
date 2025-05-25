import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const formRef = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    // Contact form entrance animation
    gsap.fromTo('.contact-form-container', {
      x: -100,
      opacity: 0,
      scale: 0.9
    }, {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '.contact-form-container',
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    // Cursor follow effect for the contact card
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - cardCenterX) * 0.1;
      const deltaY = (e.clientY - cardCenterY) * 0.1;
      
      gsap.to(card, {
        x: deltaX,
        y: deltaY,
        rotationX: deltaY * 0.1,
        rotationY: deltaX * 0.1,
        duration: 0.6,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      
      gsap.to(cardRef.current, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
    };

    // Add event listeners
    if (formRef.current) {
      formRef.current.addEventListener('mousemove', handleMouseMove);
      formRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup
    return () => {
      if (formRef.current) {
        formRef.current.removeEventListener('mousemove', handleMouseMove);
        formRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

  }, []);

  return (
    <div className='min-h-[130vh] w-[100vw] relative mt-10 '>
      {/* Contact Form Section */}
      <div 
        ref={formRef}
        className='mt-7 contact-form-container absolute inset-0 flex items-center justify-center p-8'
      >
        <div 
          ref={cardRef}
          className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-cyan-300/20 hover:shadow-3xl transition-shadow duration-300'
          style={{ perspective: '1000px' }}
        >
          <div className='text-center mb-8'>
            <h2 className='text-4xl font-bold text-white mb-4 font-zentry'>
              Get In <span className='text-cyan-300'>Touch</span>
            </h2>
            <p className='text-white/80 text-lg'>
              Ready to start your next project? Let's create something amazing together.
            </p>
          </div>

          <form className='space-y-6'>
            <div className='grid md:grid-cols-2 gap-6'>
              <div className='group'>
                <label className='block text-white/90 text-sm font-medium mb-2 group-focus-within:text-cyan-300 transition-colors'>
                  First Name
                </label>
                <input
                  type='text'
                  className='w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-300 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm focus:shadow-lg focus:shadow-cyan-300/20'
                  placeholder='John'
                />
              </div>
              <div className='group'>
                <label className='block text-white/90 text-sm font-medium mb-2 group-focus-within:text-cyan-300 transition-colors'>
                  Last Name
                </label>
                <input
                  type='text'
                  className='w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-300 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm focus:shadow-lg focus:shadow-cyan-300/20'
                  placeholder='Doe'
                />
              </div>
            </div>

            <div className='group'>
              <label className='block text-white/90 text-sm font-medium mb-2 group-focus-within:text-cyan-300 transition-colors'>
                Email Address
              </label>
              <input
                type='email'
                className='w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-300 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm focus:shadow-lg focus:shadow-cyan-300/20'
                placeholder='john@example.com'
              />
            </div>

            <div className='group'>
              <label className='block text-white/90 text-sm font-medium mb-2 group-focus-within:text-cyan-300 transition-colors'>
                Subject
              </label>
              <input
                type='text'
                className='w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-300 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm focus:shadow-lg focus:shadow-cyan-300/20'
                placeholder='Project Inquiry'
              />
            </div>

            <div className='group'>
              <label className='block text-white/90 text-sm font-medium mb-2 group-focus-within:text-cyan-300 transition-colors'>
                Message
              </label>
              <textarea
                rows='5'
                className='w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-300 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm resize-none focus:shadow-lg focus:shadow-cyan-300/20'
                placeholder='Tell us about your project...'
              ></textarea>
            </div>

            <div className='flex justify-center pt-4'>
              <button
                type='submit'
                className='group relative px-8 py-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/25 active:scale-95'
              >
                <span className='relative z-10'>Send Message</span>
                <div className='absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </button>
            </div>
          </form>

          {/* Decorative elements */}
          <div className='absolute -top-4 -right-4 w-8 h-8 bg-cyan-400/20 rounded-full blur-sm'></div>
          <div className='absolute -bottom-6 -left-6 w-12 h-12 bg-purple-400/20 rounded-full blur-md'></div>
          <div className='absolute top-1/2 -right-2 w-4 h-4 bg-white/10 rounded-full'></div>
          
          {/* Additional gradient orbs */}
          <div className='absolute top-1/4 -left-8 w-16 h-16 bg-gradient-to-r from-indigo-400/10 to-cyan-400/10 rounded-full blur-xl'></div>
          <div className='absolute bottom-1/4 -right-8 w-20 h-20 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-2xl'></div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;