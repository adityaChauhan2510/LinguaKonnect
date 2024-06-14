import React, { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";

import SidebarComp from "../components/SidebarComp";
import Navbar from "../components/Navbar";
import { Footer } from "../../shared-ui/Footer";

export default function CoursePage() {
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate(`/purchased/${id}`);
  }, [id, navigate]);

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/course/${id}`,
        {
          withCredentials: true,
        }
      );
      setCourse(response.data.result);
    } catch (err) {
      console.error("Error fetching data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  if (loading) return <Loading />;
  return (
    <>
      {course && (
        <>
          <Navbar />
          <div className="mx-5">
            <h1
              className="text-3xl font-extrabold my-5 px-5 cursor-pointer"
              onClick={handleNavigate}
            >
              {course.name}
            </h1>
            <hr className="my-2 border-t border-gray-300" />

            <div className="flex flex-row gap-3 overflow-y-auto">
              <SidebarComp id={id} course={course} />
              <Outlet
                context={{ id, course, fetchCourseData }}
                className="overflow-y-auto sm:w-[100%]"
              />
            </div>
            <hr className="border-t border-gray-300" />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
