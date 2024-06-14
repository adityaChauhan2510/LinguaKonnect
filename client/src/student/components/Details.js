import React from "react";

export default function Details({ course }) {
  return (
    <div className="grid grid-cols-2 gap-5 p-4 h-full bg-white shadow-lg items-center rounded-2xl">
      <p className="my-2 py-2 px-2 bg-gray-50 rounded-md">
        <span className="font-semibold text-gray-700">Tutor Name: </span>
        <span className="text-gray-900">
          {course.tutor_id ? course.tutor_id.name : "N/A"}
        </span>
      </p>
      <p className="my-2 py-2 px-2 bg-gray-50 rounded-md">
        <span className="font-semibold text-gray-700">Enrolled Students: </span>
        <span className="text-gray-900">{course.enrolled_students}</span>
      </p>
      <p className="my-2 py-2 px-2 bg-gray-50 rounded-md">
        <span className="font-semibold text-gray-700">Ratings: </span>
        <span className="text-gray-900">{course.rating}</span>
      </p>
      <p className="my-2 py-2 px-2 bg-gray-50 rounded-md">
        <span className="font-semibold text-gray-700">Starting On: </span>
        <span className="text-gray-900">
          {course.createdAt
            ? new Date(course.createdAt).toLocaleDateString("en-GB")
            : "N/A"}
        </span>
      </p>
      <p className="my-2 py-2 px-2 bg-gray-50 rounded-md">
        <span className="font-semibold text-gray-700">Price: </span>
        <span className="text-gray-900 font-bold">
          {"₹ "}
          {course.pricing}
        </span>
      </p>
      {course.time_durations?.map((duration, index) => (
        <React.Fragment key={index}>
          <p className="my-2 py-2 px-2 bg-gray-50 rounded-md">
            <span className="font-semibold text-gray-700">Duration: </span>
            <span className="text-gray-900">{duration.duration}</span>
          </p>
          <p className="my-2 py-2 px-2 bg-gray-50 rounded-md">
            <span className="font-semibold text-gray-700">Start Time: </span>
            <span className="text-gray-900">{duration.start_time}</span>
          </p>
          <p className="my-2 py-2 px-2 bg-gray-50 rounded-md">
            <span className="font-semibold text-gray-700">End Time: </span>
            <span className="text-gray-900">{duration.end_time}</span>
          </p>
        </React.Fragment>
      ))}
    </div>
  );
}
