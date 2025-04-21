import React from "react";
import { useOutletContext } from "react-router-dom";

import CourseDescription from "../../../components/CourseDescription";
import Image from "../../../../shared-ui/Image";
import CourseDetails from "../../../../shared-ui/CourseDetails";
import Review from "../../../../shared-ui/Review";

export default function CourseHome() {
  const { id, course } = useOutletContext();

  return (
    <>
      {course && (
        <>
          <div className="px-10 overflow-y-auto">
            <h1 className="font-extrabold text-3xl text-center tracking-wider py-6 uppercase text-gray-800 drop-shadow-lg">
              Course - Details
            </h1>

            <div className="flex flex-col lg:flex-row justify-between gap-5 items-center my-10">
              <div className="w-full lg:w-1/2 h-[50%]">
                <Image course={course} />
              </div>
              <div className="w-full lg:w-1/2 h-[50%] px-20">
                <CourseDetails course={course} />
              </div>
            </div>

            {/* COURSE-EXPECTATION */}
            <div className="h-[5rem]"></div>
            <CourseDescription value={course.description} id={id} />
            <div className="h-[5rem]"></div>

            {/* DISPLAY-REVIEWS */}
            <div className="h-[5rem]"></div>
            <Review reviews={course.reviews} />
            <div className="h-[10rem]"></div>
          </div>
        </>
      )}
    </>
  );
}
