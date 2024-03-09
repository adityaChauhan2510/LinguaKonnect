import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";

import { useNavigate } from "react-router-dom";

export default function TutorCard({ course }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/course/${course._id}`);
  }

  return (
    <div className="shadom-5xl my-7 px-5">
      <Card
        sx={{ backgroundColor: "#ccc", cursor: "pointer" }}
        onClick={handleClick}
      >
        <CardHeader title={course.name} />
        <CardMedia
          component="img"
          height="60"
          image="images/images.jpeg"
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
