import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import CourseDescription from "../components/CourseDescription";
import Image from "../../shared-ui/Image";
import CourseDetails from "../../shared-ui/CourseDetails";
import Review from "../../shared-ui/Review";

export default function CourseHome() {
  const { id, course } = useOutletContext();

  return (
    <>
      {course && (
        <>
          <div className="mx-5 overflow-y-auto">
            <h1 className="font-bold text-2xl tracking-wider py-5">
              Course Home
            </h1>

            <div className="flex flex-col lg:flex-row justify-between gap-5 items-center my-10">
              <div className="w-full lg:w-1/2 h-[50%]">
                <Image course={course} />
              </div>
              <div className="w-full lg:w-1/2 h-[50%] px-20">
                <CourseDetails course={course} />
              </div>
            </div>

            {/* EMPTY-DIV */}
            <div className="h-[3rem]"></div>

            {/* COURSE-EXPECTATION */}
            <div>
              <h1 className="font-bold text-2xl tracking-wider py-5">
                Course Description
              </h1>

              {course.description && (
                <CourseDescription value={course.description} id={id} />
              )}
            </div>

            {/* EMPTY-DIV */}
            <div className="h-[3rem]"></div>
            <div>
              <h1 className="font-bold text-2xl tracking-wider py-5">
                Reviews
              </h1>

              <Review reviews={course.reviews} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
