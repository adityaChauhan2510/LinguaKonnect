import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";

import { useNavigate } from "react-router-dom";


export default function StudentCard({ key, course }) {
  const navigate = useNavigate();

  function handleClick(e) {
    console.log(e);
    navigate(`/course/${course._id}`);
  }

  return (
    <div className="shadow-5xl my-7 px-5">
      <Card sx={{ cursor: "pointer" }} onClick={handleClick}>
        <CardHeader title={course.name} />
        <CardMedia
          component="img"
          height="60"
          image="images/bg2.jpg"
          alt="Image"
        />

        <p className="mx-3 text-md font-semibold">
          Language : {course.language}
        </p>
        <p className="mx-3 text-md font-semibold">
          {/* TutorName : {course.tutor.name} */}
        </p>
        <p className="mx-3 text-md font-semibold py-2">
          Ratings: <Rating name="half-rating" defaultValue={course.rating} />
        </p>
      </Card>
    </div>
  );
}
