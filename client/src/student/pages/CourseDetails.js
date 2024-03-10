import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SelectDuration from "../components/SelectDuration";
import { Button } from "@mui/material";
import Review from "../components/Review";
import TimeSlots from "../components/TimeSlots";
import Notes from "../components/Notes";
import axios from "axios";

export default function CourseDetails() {
  const [courseDetails, setCourseDetails] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/course/${id}`,
          {
            withCredentials: true,
          }
        );

        //console.log(response.data.result);
        setCourseDetails(response.data.result);

        const enrolledCourses = await axios.get(
          `http://localhost:8000/api/v1/user/getcourses`,
          {
            withCredentials: true,
          }
        );

        const enrolledCourseIds = enrolledCourses.data.enrolledCourses.map(
          (course) => course.courseId._id
        );

        setIsEnrolled(enrolledCourseIds.includes(id));
        //console.log(isEnrolled);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="mt-5 mx-10">Loading...</div>;

  return (
    <>
      <Navbar />

      <h1 className="mt-5 mx-10 text-3xl font-bold">{courseDetails.name}</h1>
      {isEnrolled ? (
        <div className="flex gap-5">
          <div className="mx-10 mt-10 h-[20rem] w-[30rem] bg-gray-200">
            video-link-to-class
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
              <img src="/images/bg2.jpg" alt="background-image" />
            </div>
            <div className="mx-10 mt-10">
              <p className="my-3 py-2">
                TutorName :{" "}
                {courseDetails.tutor_id ? courseDetails.tutor_id.name : ""}
              </p>
              <p className="my-3 py-2">
                Enrolled-students : {courseDetails.enrolled_students}
              </p>
              <p className="my-3 py-2">Ratings : {courseDetails.rating}</p>
              <p className="my-3 py-2">
                Starting on :{" "}
                {courseDetails.createdAt
                  ? new Date(courseDetails.createdAt).toLocaleDateString(
                      "en-GB"
                    )
                  : ""}
              </p>
              <p className="my-3 py-2">
                Price : {"$ "}
                {courseDetails.pricing}
              </p>
            </div>
          </div>

          <div className="mt-10 mx-10 flex flex-row justify-between">
            <SelectDuration Duration={courseDetails.slot_time_in_min} />
            <TimeSlots time_durations={courseDetails.time_durations} />
            <Button variant="contained" color="success">
              Purchase
            </Button>
          </div>
          <div className="mt-10 mx-10">
            <h1 className="text-3xl mt-20 mb-10">What Others Say!!</h1>
            <Review />
          </div>
        </>
      )}
    </>
  );
}
