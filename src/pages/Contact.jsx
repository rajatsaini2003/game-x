import React from 'react';
import ContactHeader from '../components/ContactHeader';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className='w-full bg-gradient-to-br from-gray-700  to-black'>
      <div className='visible md:invisible w-full h-16'></div>
      <ContactHeader />
      <ContactForm />
    </div>
  );
};

export default Contact;