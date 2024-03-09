import React,{useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const studentposts = [
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

export default function StudentCard() {
  const [blogPosts, setBlogPosts] = useState(studentposts);
  const [live,setLive] =useState(false);
  const handlelive=()=>{
      setLive(!live)
  }
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
                               src={blogPost.author.profilePicture.url}
                               alt=""
                            />
                         </div>
                         <p className="text-lg description">Instructor :{blogPost.name}</p>
                         <p className="text-lg description">Language :{blogPost.language}</p>
                         <p className="text-lg description">Duration :{blogPost.duration}</p>
                         <p className="text-lg description">
                                        <Stack spacing={1}>
                            <Rating name="half-rating" defaultValue={blogPost.rating} />
                    </Stack>
                           </p>
                         <a
                            href={blogPost.postUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="read-more"
                         >
                          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={handlelive}>Join Class</button>
                         </a>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       ) : (
          <div className="loading">Loading...</div>
       )}
    </div>

  </div>
  );
}