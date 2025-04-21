//Home page for each course after purchasing

import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Image from "../../../../shared-ui/Image";
import CourseDetails from "../../../../shared-ui/CourseDetails";
import CourseDescription from "../../../components/CourseDescription";
import Review from "../../../../shared-ui/Review";
import axios from "axios";
import WriteReview from "../../../components/WriteReview";
import CommentLoader from "../../../../shared-ui/CommentLoader";
import toast from "react-hot-toast";

export default function CourseDashboard() {
  const { id, course, fetchCourseData } = useOutletContext();
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (review.length === 0) {
      alert("Can't submit an empty review..");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/course/review`,
        { course_id: id, review },
        { withCredentials: true }
      );

      toast.success(response.data.message);
      await fetchCourseData();
    } catch (error) {
      console.error("Error enrolling in course:", error.message);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
      setReview("");
    }
  };

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
            <CourseDescription value={course.description} />
            <div className="h-[5rem]"></div>

            {/* REVIEWS */}
            <div className="h-[5rem]"></div>
            <Review reviews={course.reviews} />
            <div className="h-[5rem]"></div>

            {/* DISPLAY-REVIEWS */}
            <div className="h-[5rem]"></div>
            <div>
              <h1 className="font-bold text-2xl tracking-wider py-6 uppercase text-gray-800 drop-shadow-lg">
                Share Your Thoughts
              </h1>
              {loading ? (
                <CommentLoader />
              ) : (
                <div className="">
                  <WriteReview
                    review={review}
                    setReview={setReview}
                    handleSubmitReview={handleSubmitReview}
                  />
                </div>
              )}
            </div>
            <div className="h-[5rem]"></div>
          </div>
        </>
      )}
    </>
  );
}
