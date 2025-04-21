import React from "react";
import { FaUsers, FaStar, FaClock, FaPlay, FaStop } from "react-icons/fa";

export default function CourseDetails({ course }) {
  return (
    <div className="p-5 bg-white tracking-wider">
      <div className="grid gap-3 text-gray-800 text-lg font-[Inter] space-y-4">
        <p className="flex items-center gap-2">
          <FaUsers className="text-blue-500" />
          <span className="font-semibold">Students Enrolled :</span>
          <span className="text-gray-900">{course.enrolled_students}</span>
        </p>

        <p className="flex items-center gap-2">
          <FaStar className="text-yellow-500" />
          <span className="font-semibold">Ratings:</span>
          <span className="text-gray-900">{course.rating}</span>
        </p>

        {course.time_durations?.length > 0 && (
          <>
            <p className="flex items-center gap-2">
              <FaClock className="text-green-500" />
              <span className="font-semibold">Duration:</span>
              <span className="text-gray-900">
                {course.time_durations[0]?.duration}
              </span>
            </p>

            <p className="flex items-center gap-2">
              <FaPlay className="text-purple-500" />
              <span className="font-semibold">Start Time:</span>
              <span className="text-gray-900">
                {course.time_durations[0]?.start_time}
              </span>
            </p>

            <p className="flex items-center gap-2">
              <FaStop className="text-red-500" />
              <span className="font-semibold">End Time:</span>
              <span className="text-gray-900">
                {course.time_durations[0]?.end_time}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
