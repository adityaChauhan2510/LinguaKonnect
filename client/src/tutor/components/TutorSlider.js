import React,{useState} from 'react'

import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
const tutorposts = [
    {
       id: 1,
       language:"Hindi",
       duration:"45",
       name:"Mohit Tyagi",
       rating:2,
       profilePicture: {
             url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
          },
    }
  ];


  
function TutorSlider() {
    const [blogPosts, setBlogPosts] = useState(tutorposts);
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
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };
  return (
    <div>

<div className="container">
         {blogPosts ? (
            <div className="shadow-lg mx-28 m-4 object-contain h-48 w-96 blog-content-section">
               <div className="shadow-2xl blog-container">
                  {blogPosts.map((blogPost) => (
                     <div className="blog-post" key={blogPost.id}>
                        <div className="card-details">
                           <div className="lh-details">
                              <img
                                 className="author-img"
                                 src={blogPost.profilePicture.url}
                                 alt=""
                              />
                           </div>
                           <p className="text-lg description">Language :{blogPost.language}</p>
                           <p className="text-lg description">Duration :{blogPost.duration}</p>
                           <p className="text-lg description">
                                        <Stack spacing={1}>
                            <Rating name="half-rating" defaultValue={blogPost.rating} />
                    </Stack>
                           </p>

                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' >Start Class</button>
                            <button onClick={handleButtonClick} className='ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' >Purchase</button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         ) : (
            <div className="loading">Loading...</div>
         )}

      </div>

      {isFormVisible && (
            <div className="z-[-1] bg-blue-700 mx-40 w-80px content-center  form-container">
              <form onSubmit={handleFormClose}>
              <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-96 md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2" for="grid-first-name">
                Insutructor Name
                </label>     
                <input readOnly value={`Rohan`} class="appearance-none block w-96 bg-white-200 text-white-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter Name"/>
              </div>
              <div class="inline-block pb-10 w-96 md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2" for="grid-first-name">
                Account Number
                </label>
                <input value={`4003830171874018`} class="appearance-none block w-96 bg-white-200 text-white-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter Name"/>
              </div>
              <div class="inline-block w-96 md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2" for="grid-first-name">
                Course Name
                </label>
                <input value={name} class="appearance-none block w-96 bg-white-200 text-white-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Advanced English"/>
              </div>
              <div class="inline-block w-96 md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2" for="grid-first-name">
                Duration
                </label>
                <input value={name} class="appearance-none block w-96 bg-white-200 text-white-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="45 Minutes"/>
              </div>
              <div className="ml-4 terms-checkbox">
               <input
               type="checkbox"
               id="agree-to-terms"
               name="agree-to-terms"
               checked={isChecked}
               onChange={handleCheckboxChange}
               />
               <label htmlFor="agree-to-terms">I agree to the Terms and Conditions</label>
            </div>
              </div>
                <button type="submit" className='ml-4 bg-black-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Submit</button>
                <button className='ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={handleFormClose}>Close Form</button>
              </form>

            </div>
          )}
    </div>
  )
}

export default TutorSlider