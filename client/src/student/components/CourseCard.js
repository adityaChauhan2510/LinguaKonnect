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
      // console.log(Ids);

      if (course && Ids.includes(course._id)) {
        navigate(`/purchased/${course._id}`);
      } else {
        navigate(`/course/${course._id}`);
      }
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  }
  return (
    <>
      {course && course._id && (
        <div className="my-7 px-5 mx-5 rounded-lg">
          <Card
            sx={{
              backgroundColor: "#ccc",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              height: "330px",
              transition: "transform 0.3s ease-in-out",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
              "&:hover": { transform: "scale(1.03)" },
            }}
            onClick={handleClick}
          >
            <p className="font-bold w-full text-2xl py-3 px-4 uppercase bg-gray-700 text-white font-[Inter] tracking-wide">
              {course.name}
            </p>

            <div style={{ height: "200px", overflow: "hidden" }}>
              <CardMedia
                component="img"
                sx={{ objectFit: "cover", height: "100%" }}
                image={course.image}
                alt="Image"
              />
            </div>

            <div className="w-full py-2 mx-4">
              <div className="grid grid-cols-[auto_1fr] gap-x-6 items-center">
                <p className="text-lg font-semibold text-gray-800 tracking-wide font-[Inter]">
                  Language
                </p>
                <span className="text-gray-800 text-lg font-[Inter] tracking-wide">
                  {course.language}
                </span>
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-x-10 items-center pt-1">
                <p className="text-lg font-semibold text-gray-800 tracking-wide font-[Inter]">
                  Ratings
                </p>
                <Rating
                  name="rating"
                  defaultValue={course.rating}
                  readOnly
                  className="text-yellow-400"
                />
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-x-[3.7rem] items-center">
                <p className="text-lg font-semibold text-gray-800 tracking-wide font-[Inter]">
                  Price
                </p>
                <span className="text-gray-800 text-lg font-[Inter] tracking-wide">
                  <span>
                    <strong>₹ </strong>
                  </span>
                  {course.pricing}
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
