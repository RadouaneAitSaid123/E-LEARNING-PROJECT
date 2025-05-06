import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import Certificates from './components/Certificates/Certificates'
import MyCourses from './components/MyCourses/MyCourses'
import AvailableCourses from './components/AvailableCourses/AvailableCourses'
import CourseCheckout from './components/CourseCheckout/CourseCheckout'
import CourseDetails from './components/CourseDetails/CourseDetails'
import './App.css'
import CourseView from './components/CourseView/CourseView'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/available-courses" element={<AvailableCourses />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/course-checkout" element={<CourseCheckout />} />
        <Route path="/course-details/:courseId" element={<CourseDetails />} />
        <Route path="/course-view/:courseId" element={<CourseView />} />
        {/* Autres routes existantes */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
