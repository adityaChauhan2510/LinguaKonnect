import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SelectDuration from "../components/SelectDuration";
import { Button } from "@mui/material";
import Review from "../components/Review";
import TimeSlots from "../components/TimeSlots";
import Notes from "../components/Notes";
import axios from "axios";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

export default function CourseDetails() {
  const [courseDetails, setCourseDetails] = useState({});
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [chat, setChat] = useState([]);
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

        console.log(response.data.result);
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

        const { data } = await axios.get(
          `http://localhost:8000/api/v1/user/me`,
          {
            withCredentials: true,
          }
        );

        console.log(data.user.name);
        setUserName(data.user.name);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  }, [chat, setChat]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
  };

  if (loading) return <div className="mt-5 mx-10">Loading...</div>;

  return (
    <>
      <Navbar />

      <h1 className="mt-5 mx-10 text-3xl font-bold">{courseDetails.name}</h1>
      {isEnrolled ? (
        <>
          <div className="flex gap-5">
            <div className="mx-10 mt-10 h-[20rem] w-[30rem] bg-gray-200">
              video-link-to-class
              {/* <StudentVideo /> */}
            </div>
            <div className="mx-10 px-10 mt-10">
              <Notes />
            </div>
          </div>

          <div className="mx-10 my-10">
            <h2 className="text-2xl">Ask your tutor</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-row gap-4">
                <input
                  type="text"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border border-gray-300 rounded px-2 my-3"
                />
                <div className="px-2 my-3">
                  <Button variant="contained" color="primary" type="submit">
                    Send Message
                  </Button>
                </div>
              </div>
            </form>
            {chat.map((payload, index) => (
              <p key={index}>
                {payload.message} :{" "}
                <span className="font-bold px-5">{payload.userName}</span>
              </p>
            ))}
          </div>
        </>
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
