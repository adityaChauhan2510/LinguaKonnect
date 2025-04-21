import React, { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import axios from "axios";

import Navbar from "../../components/Navbar";
import { Footer } from "../../../shared-ui/Footer";
import SideBar from "../../components/SideBar";

export default function CoursePage() {
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null); // <-- Lifted state of sidebar.
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/course/${id}`,
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

  const handleNavigate = useCallback(() => {
    setSelected(null);
    navigate(`/purchased/${id}`);
    fetchCourseData();
  }, [id, navigate]);

  useEffect(() => {
    fetchCourseData();
  }, []);

  if (loading) return <Loading />;
  return (
    <>
      {course && (
        <>
          <Navbar />
          <div className="px-5">
            <h1
              className="text-3xl font-extrabold tracking-wide my-5 px-5 cursor-pointer"
              onClick={handleNavigate}
            >
              {course.name}
            </h1>
            <hr className="border-t border-gray-300" />

            <div className="flex flex-row gap-3 overflow-y-auto">
              <SideBar
                course={course}
                selected={selected}
                setSelected={setSelected}
              />
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
