import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import StudentCard from "../components/StudentCard";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../components/Loading";
const URI = "https://linguakonnect.onrender.com";

export default function MyCart() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/user/getcourses`,
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

    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <h1 className="mx-10 my-10 text-3xl font-bold">Courses Taken</h1>

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
    </>
  );
}
