import React, { useState, useEffect, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SelectDuration from "../components/SelectDuration";
import { Button } from "@mui/material";
import Review from "../components/Review";
import TimeSlots from "../components/TimeSlots";
import Notes from "../components/Notes";
import axios from "axios";
import StudentVideo from "../components/StudentVideo.js";
import { Context } from "../../index.js";

export default function CourseDetails() {
  const [courseDetails, setCourseDetails] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { user, isAuthenticated } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/course/${id}`,
          {
            withCredentials: true,
          }
        );

        // Ensure that user is available and not an empty object
        if (
          user &&
          Object.keys(user).length !== 0 &&
          Array.isArray(user.courses)
        ) {
          const enrolledCourse = user.courses.find(
            (course) => course.courseId === id
          );
          setIsEnrolled(!!enrolledCourse);
          setCourseDetails(response.data.result);
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchData();
  }, [id, user]);

  console.log(`Hello ${user}`);

  if (!isAuthenticated || !user || Object.keys(user).length === 0) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Navbar />
      <h1 className="mt-5 mx-10 text-3xl font-bold">{courseDetails.name}</h1>

      {isEnrolled ? (
        <div className="flex gap-5">
          <div className="mx-10 mt-10 h-[20rem] w-[30rem] bg-gray-200">
            {/* <StudentVideo /> */}
          </div>
          <div className="mx-10 px-10 mt-10">
            <Notes />
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-4">
            <div className="mx-10 mt-10 h-[20rem] w-[30rem] bg-gray-200">
              <img src="/images/bg2.jpg" alt="Background" />
            </div>
            <div className="mx-10 mt-10">
              <p className="my-3 py-2">TutorName</p>
              <p className="my-3 py-2">
                Enrolled-students : {courseDetails.enrolled_students}
              </p>
              <p className="my-3 py-2">Ratings : {courseDetails.rating}</p>
              <p className="my-3 py-2">
                Starting on : {courseDetails.createdAt}
              </p>
              <p className="my-3 py-2">Price : {courseDetails.pricing}</p>
            </div>
          </div>

          <div className="mt-10 mx-10 flex flex-row justify-between">
            <SelectDuration />
            <TimeSlots />
            <Button variant="contained" color="success">
              Purchase
            </Button>
          </div>
          <div className="mt-10 mx-10">
            <h1 className="text-3xl mt-20 mb-10 mx-12">Reviews</h1>
            <Review />
          </div>
        </>
      )}
    </>
  );
}
