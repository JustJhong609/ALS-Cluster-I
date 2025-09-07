import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Announcements from './components/Announcements'
import About from './components/About'
import Materials from './components/Materials'
import Forms from './components/Forms'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <main>
          <Hero />
          <Announcements />
          <About />
          <Materials />
          <Forms />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  )
}

export default App
