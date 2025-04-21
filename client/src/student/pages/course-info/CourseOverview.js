//Before Purchasing Course Page

import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Button, TextField } from "@mui/material";

// import Notes from "../components/Notes";
// import io from "socket.io-client";
//import StarRating from "../components/StarRating";
import axios from "axios";
import toast from "react-hot-toast";
import AskDoubt from "../../components/AskDoubt";
import Details from "../../components/Details";

import Loading from "../../components/Loading";
import { Footer } from "../../../shared-ui/Footer";
import Review from "../../../shared-ui/Review";
import RotatingLineLoader from "../../../shared-ui/RotatingLineLoader";

export default function CourseDetails() {
  const [course, setCourse] = useState({});
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [chat, setChat] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [doubtLoading, setDoubtLoading] = useState(false);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [openDoubtModal, setOpenDoubtModal] = useState(false);
  const [doubt, setDoubt] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDoubtSubmit = async (e) => {
    e.preventDefault();
    try {
      setDoubtLoading(true);
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
      setDoubtLoading(false);
      setDoubt("");
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

  if (loading) return <Loading />;
  if (doubtLoading) return <RotatingLineLoader />;

  return (
    <>
      <Navbar />
      {course && (
        <div className="mx-2">
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

          {/* EMPTY_DIV */}
          <div className="h-[5rem]"></div>
        </div>
      )}
      <Footer />
    </>
  );
}
