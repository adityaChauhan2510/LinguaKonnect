import React, { useState, useEffect } from "react";
import axios from "axios";

import StudentCard from "../../components/CourseCard";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import { Footer } from "../../../shared-ui/Footer";

export default function MyCart() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/getcourses`,
        {
          withCredentials: true,
        }
      );

      setEnrolledCourses(data.enrolledCourses);
      toast.success(data.message);
    } catch (err) {
      console.error("Error fetching data:", err.message);
      toast.error(err.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <h1 className="mx-10 my-10 text-3xl font-bold">Courses Purchased</h1>

      <div className="mt-10">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((course) => (
              <StudentCard key={course._id} course={course.courseId} />
            ))
          ) : (
            <h1 className="text-2xl font-semibold mx-10">
              No courses purchased !!.
            </h1>
          )}
        </section>
      </div>

      {/* EMPTY DIVS FOR HEIGHT */}
      <div className="h-[10rem]"></div>
      <div className="h-[10rem]"></div>

      <Footer />
    </>
  );
}
