import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button, CardMedia, Modal, TextField, Box } from "@mui/material";

import Notes from "../components/Notes";
import axios from "axios";
import io from "socket.io-client";
import toast from "react-hot-toast";
import StarRating from "../components/StarRating";
import AskDoubt from "../components/AskDoubt";
import Details from "../components/Details";

import Loading from "../components/Loading";
import { Footer } from "../../shared-ui/Footer";
import Review from "../../shared-ui/Review";

// const socket = io("http://localhost:5000", {
//   autoConnect: false,
// });

export default function CourseDetails() {
  const [course, setCourse] = useState({});
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [chat, setChat] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [openDoubtModal, setOpenDoubtModal] = useState(false);
  const [doubt, setDoubt] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDoubtSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/course/ask-doubt`,
        { course_id: id, doubt },
        { withCredentials: true }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error submitting doubt:", error.message);
      toast.error(error.response?.data?.message || "Error submitting doubt");
    } finally {
      setLoading(false);
      setDoubt(""); // Clear the input field after submission
      setOpenDoubtModal(false); // Close the modal after submission
    }
  };

  // const handleRating = async (index) => {
  //   setRating(() => index);
  //   try {
  //     setLoading(true);
  //     const response = await axios.post(
  //       "http://localhost:8000/api/v1/course/rate",
  //       { course_id: id, rating: index },
  //       { withCredentials: true }
  //     );

  //     toast.success(response.data.message);
  //   } catch (error) {
  //     console.error("Error in course rating:", error.message);
  //     toast.error(error.response?.data?.message || "An error occurred");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleCoursePurchase = async (e) => {
    e.preventDefault();

    const confirmPurchase = window.confirm(
      "Are you sure you want to purchase this course?"
    );

    if (!confirmPurchase) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/course/enroll`,
        { course_id: id },
        { withCredentials: true }
      );

      toast.success(response.data.message);
      navigate(`/purchased/${course._id}`);
    } catch (error) {
      console.error("Error enrolling in course:", error.message);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/course/${id}`,
          {
            withCredentials: true,
          }
        );

        setCourse(res.data.result);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setCourse]);

  // useEffect(() => {
  //   socket.on("chat", (payload) => {
  //     setChat((prevChat) => [...prevChat, payload]);
  //   });

  //   socket.on("error", (error) => {
  //     toast.error(error.message);
  //   });

  //   return () => {
  //     socket.off("chat");
  //     socket.off("error");
  //   };
  // }, [chat, setChat]);

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   socket.connect();
  //   socket.emit("chat", { message, userName, roomId: id });
  //   setMessage("");
  // };

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      {course && (
        <div className="mx-10">
          <h1 className="text-2xl sm:text-3xl tracking-wide md:text-4xl font-bold mx-10 my-10">
            {`Welcome to ${course.name}`}
          </h1>

          <div className="mx-10 flex md:flex-row flex-col gap-10 my-[2.5rem]">
            <div className="w-full md:w-1/2">
              <img
                src={course.image}
                alt="image"
                className="w-full h-full rounded-2xl object-contain shadow-2xl"
              />
            </div>
            <div className="w-full md:w-1/2 h-full">
              <Details course={course} />
            </div>
          </div>

          <div className="h-[3rem]"></div>
          <div className="mx-10">
            <h1 className="text-2xl font-bold tracking-wide">
              Course Description
            </h1>
            <div className="my-5">
              <TextField
                fullWidth
                multiline
                rows={8}
                variant="outlined"
                value={course.description}
              />
            </div>
          </div>

          <div className="flex flex-row justify-between mx-10 my-10">
            <Button
              variant="contained"
              className="grow-shrink-button"
              color="success"
              onClick={handleCoursePurchase}
            >
              Purchase Course 🛍️🛍️
            </Button>
            <AskDoubt
              doubt={doubt}
              setDoubt={setDoubt}
              handleDoubtSubmit={handleDoubtSubmit}
              openDoubtModal={openDoubtModal}
              setOpenDoubtModal={setOpenDoubtModal}
            />
          </div>

          {/* EMPTY_DIV */}

          <div className="h-[5rem]"></div>

          {course && course.reviews && course.reviews.length > 0 && (
            <div className="mt-10 mx-10">
              <Review reviews={course.reviews} />
            </div>
          )}

          <div className="h-[5rem]"></div>
        </div>
      )}
      <Footer />
    </>
  );
}

// {isEnrolled ? (
//   <>
//     <div className="flex justify-between">
//       <h1 className="mt-5 mx-10 text-3xl font-bold">{course.name}</h1>
//       <div className="flex">
//         <h2 className="my-5 mx-2 text-lg font-bold">Rate Us</h2>
//         <span className="my-2 mr-10 px-2 text-md font-bold">
//           <StarRating
//             rating={rating}
//             hover={hover}
//             handleRating={handleRating}
//             setHover={setHover}
//             setRating={setRating}
//           />
//         </span>
//       </div>
//     </div>
//     <div className="flex gap-5">
//       <div className="mx-10 mt-10 h-[20rem] w-[30rem] bg-gray-200">
//         video-link-to-class
//         {/* <StudentVideo /> */}
//       </div>
//       <div className="mx-10 px-10 mt-10">
//         <Notes />
//       </div>
//     </div>

//     <div className="mx-10 my-10">
//       <h2 className="text-2xl">Live Chats</h2>

//       {/* input field for showing chats during class */}
//       <form onSubmit={handleFormSubmit}>
//         <div className="flex flex-row gap-4">
//           <input
//             type="text"
//             placeholder="Message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="border border-gray-300 rounded px-2 my-3"
//           />
//           <div className="px-2 my-3">
//             <Button variant="contained" color="primary" type="submit">
//               Send Message
//             </Button>
//           </div>
//         </div>
//       </form>

//       {chat.map((payload, index) => (
//         <p key={index}>
//           {payload.message} :{" "}
//           <span className="font-bold px-5">{payload.userName}</span>
//         </p>
//       ))}

//       <div className="my-10">
//         <ReviewForm
//           review={review}
//           setReview={setReview}
//           handleSubmitReview={handleSubmitReview}
//         />
//       </div>
//     </div>
//   </>
// ) : (
