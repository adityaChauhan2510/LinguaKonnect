import React, { useState } from "react";
import { Card, CardMedia, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TutorCard({ course }) {
  const [ratingValue, setRatingValue] = useState(course.rating || 0);
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/tutorcourse/${course._id}`);
  }

  return (
    <>
      {course && course.image && (
        <div className="shadow-4xl my-7 px-5 mx-5 rounded-xl">
          <Card
            sx={{
              backgroundColor: "#ccc",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              height: "300px",
            }}
            onClick={handleClick}
          >
            <div className="font-bold text-2xl py-2 px-3 uppercase">
              {course.name}
            </div>

            <div style={{ height: "200px", overflow: "hidden" }}>
              <CardMedia
                component="img"
                sx={{ objectFit: "cover", height: "100%" }}
                image={course.image}
                alt="Image"
              />
            </div>

            <p className="mt-1 mx-3 text-md font-semibold">
              Language : {course.language}
            </p>

            <div className="flex gap-3">
              <p className="ml-3 mr-1 text-md font-semibold">Ratings : </p>
              <Rating
                name={`rating-${course._id}`}
                value={ratingValue}
                onChange={(event, newValue) => {
                  setRatingValue(newValue);
                }}
                sx={{ height: "2px" }}
              />
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
