import React from 'react'
import Navbar from '../components/TNavbar.js'
import TutorCard from '../components/TutorCard.js'
import TutorSlider from '../components/TutorSlider.js'
function TutorHome() {
  return (
    <div>
      <Navbar/>
      <TutorCard/>
      <TutorSlider/>
    </div>
  )
}

export default TutorHome