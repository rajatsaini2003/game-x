import React from 'react'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Story from '../components/Story'
import Features from '../components/Features'
import ContactUs from "../components/ContactUs"; 
const Home = () => {
  return (
    <div>
      <Hero/>
      <Intro/>
      <Story/>
      <ContactUs/>
    </div>
  )
}

export default Home
