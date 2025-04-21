import React from "react";

export default function Image({ course }) {
  return (
    <>
      <img
        src={course.image}
        alt="course-image"
        className="w-full h-auto rounded-xl shadow-2xl transition-transform duration-400 hover:scale-105"
      />
    </>
  );
}
