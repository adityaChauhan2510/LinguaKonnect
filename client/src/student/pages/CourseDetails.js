import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SelectDuration from "../components/SelectDuration";
import { Button } from "@mui/material";
import Review from "../components/Review";
import TimeSlots from "../components/TimeSlots";
import Notes from "../components/Notes";

/**
 *
 *
 *
 */

export default function CourseDetails() {
  const [coursename, setCourseName] = useState("");
  const [tutuorName, setTutuorName] = useState("");
  const [studentEnrolled, setStudentEnrolled] = useState("");
  const [ratings, setRatings] = useState("");
  const [price, setPrice] = useState();
  const [isEnrolled, setIsEnrolled] = useState(false);

  const { id } = useParams();

  return (
    <>
      <Navbar />
      <h1 className="mt-5 mx-10 text-3xl font-bold">Course-Name</h1>

      {isEnrolled === true ? (
        <div className="flex gap-4">
          <div className="mx-10 mt-10 h-[20rem] w-[30rem] bg-gray-200">
            live-class-video
          </div>
          <div className="mx-10 mt-10">
            <Notes />
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-4">
            <div className="mx-10 mt-10 h-[20rem] w-[30rem] bg-gray-200"></div>
            <div className="mx-10 mt-10">
              <p className="my-3 py-2">TutorName</p>
              <p className="my-3 py-2"> StudentsEnrolled</p>
              <p className="my-3 py-2">Ratings</p>
              <p className="my-3 py-2">Starting On</p>
              <p className="my-3 py-2">Price</p>
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