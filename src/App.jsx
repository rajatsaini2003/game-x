import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import ScrollTop from './components/ScrollTop'
const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <ScrollTop/>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
      <Footer/>
    </main>
  )
}

export default App
