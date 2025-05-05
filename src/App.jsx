import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import Certificates from './components/Certificates/Certificates'
import MyCourses from './components/MyCourses/MyCourses'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/my-courses" element={<MyCourses />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
