import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import MyCourses from './components/MyCourses/MyCourses'
import AvailableCourses from './components/AvailableCourses/AvailableCourses'
import CourseCheckout from './components/CourseCheckout/CourseCheckout'
import CourseDetails from './components/CourseDetails/CourseDetails'
import CourseView from './components/CourseView/CourseView'
import Certificate from './components/Certificate/Certificate'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/*<Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />*/}
        <Route path="/" element={
          <>
            <Header />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/available-courses" element={
          <>
            <Header />
            <AvailableCourses />
            <Footer />
          </>
        } />
        <Route path="/my-courses" element={
          <>
            <Header />
            <MyCourses />
            <Footer />
          </>
        } />
        <Route path="/course-checkout" element={
          <>
            <Header />
            <CourseCheckout />
            <Footer />
          </>
        } />
        <Route path="/course-details/:courseId" element={
          <>
            <Header />
            <CourseDetails />
            <Footer />
          </>
        } />
        <Route path="/course-view/:courseId" element={
          <>
            <CourseView />
          </>
        } />
        <Route path="/certificate/:courseId" element={
          <>
            <Header />
            <Certificate />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
