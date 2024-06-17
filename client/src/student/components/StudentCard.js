import React from "react";
import { Card, CardMedia, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CourseCard({ course }) {
  const navigate = useNavigate();

  async function handleClick() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/getcourses`,
        {
          withCredentials: true,
        }
      );

      const { enrolledCourses } = res.data;
      const Ids = enrolledCourses.map((course) => course.courseId._id);

      if (Ids.includes(course._id)) {
        navigate(`/purchased/${course._id}`);
      } else {
        navigate(`/course/${course._id}`);
      }
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  }
  return (
    course && (
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

          <div className="flex">
            <p className="ml-3 mr-1 text-md font-semibold">Ratings : </p>
            <Rating
              name="rating"
              defaultValue={course.rating}
              sx={{ height: "2px" }}
            />
          </div>
        </Card>
      </div>
    )
  );
}
