import React, { useState } from 'react'
import Navbar from '../components/TNavbar.js'
import TutorCard from '../components/TutorCard.js'
import TutorSlider from '../components/TutorSlider.js'

import { Select, Option } from "@material-tailwind/react";
const tutorposts = [
  {
     id: 1,
     language:"Hindi",
     duration:"45",
     name:"Mohit Tyagi",
     rating:2,
     author: {
        profilePicture: {
           url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        },
     },

  }
];



function TutorHome() {
  const [name,setName] = useState("")
  const [language,setLanguage] =useState("")
  const [duration,setDuration] = useState("")
  const [enrolled,setEnrolled] = useState("")
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleButtonClick = () => {
    setIsFormVisible(true);
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
  };
    const [selectedItems, setSelectedItems] = useState([]);
  
  const handleCB = (event) => {
    const checkbox = event.target;
    if (checkbox.checked) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, checkbox.value]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== checkbox.value)
      );
    }
  };
  const addcourse=({name,language,duration,enrolled})=>{
    
  }
  return (
    <div>
      <Navbar/>
      <TutorCard/>
      <form class="shadow-2xl m-10 w-full max-w-lg">
  <div class="flex flex-wrap -mx-3 mb-6">

    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
      Course Name
      </label>
      <input value={name} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Advanced English"/>
    </div>
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
      Duration
      </label>
      <input value={duration} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="45 min"/>
    </div>

    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
      Language
      </label>
      <input value={language} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="English"/>
    </div>
    <button onClick={handleButtonClick} class="ml-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
  Submit
</button>
  </div>
</form>
      <TutorSlider/>
    </div>
  )
}

export default TutorHome