import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import StudentCard from "../components/StudentCard";

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

        console.log(data);
        setEnrolledCourses(data.enrolledCourses);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="mx-10 my-10 text-3xl font-bold">Courses Taken</h1>

      <div className="mt-10">
        {loading ? (
          <p className="text-l font-semibold mx-10">Loading...</p>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
            {enrolledCourses.length > 0 ? (
              enrolledCourses.map((course) => (
                <StudentCard key={course._id} course={course.courseId} />
              ))
            ) : (
              <h1 className="text-1xl font-semibold">
                No courses purchased!!!
              </h1>
            )}
          </section>
        )}
      </div>
    </>
  );
}
