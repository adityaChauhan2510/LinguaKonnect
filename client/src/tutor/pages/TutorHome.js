import React from 'react'
import Navbar from '../components/TNavbar.js'
import TutorCard from '../components/TutorCard.js'
import TutorSlider from '../components/TutorSlider.js'
import StudentCard from '../../student/components/StudentCard.js'
function TutorHome() {
  return (
    <div>
      <Navbar/>
      <TutorCard/>
      <TutorSlider/>
      <StudentCard/>
    </div>
  )
}

export default TutorHome