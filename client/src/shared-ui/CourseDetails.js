import React from "react";

export default function CourseDetails({ course }) {
  return (
    <>
      <p className="m-2 text-md font-semibold">
        Students Enrolled:{" "}
        <span className="font-semibold">{course.enrolled_students}</span>
      </p>
      <p className="m-2 text-md font-semibold">
        Ratings: <span className="font-semibold">{course.rating}</span>
      </p>
      <p className="m-2 text-md font-semibold">
        Price: <span className="font-semibold">{course.pricing}</span>
      </p>

      {course.time_durations && course.time_durations.length > 0 && (
        <>
          <p className="m-2 text-md font-semibold">
            Duration:{" "}
            <span className="font-semibold">
              {course.time_durations[0]?.duration}
            </span>
          </p>
          <p className="m-2 text-md font-semibold">
            Start Time:{" "}
            <span className="font-semibold">
              {course.time_durations[0]?.start_time}
            </span>
          </p>
          <p className="m-2 text-md font-semibold">
            End Time:{" "}
            <span className="font-semibold">
              {course.time_durations[0]?.end_time}
            </span>
          </p>
        </>
      )}
    </>
  );
}
