import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import Navbar from "../../components/TNavbar.js";
import SidebarComp from "../../components/SidebarComp.js";
import { Footer } from "../../../shared-ui/Footer.js";
import Loading from "../../components/Loading.js";
import axios from "axios";

export default function TutorCourseDetails() {
  const [course, setCourse] = useState({});
  const [userName, setUserName] = useState("");
  const [selected, setSelected] = useState(null); // <-- Lifted state of sidebar.
  const [loading, setLoading] = useState(false);
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
      setUserName(response.data.result.tutor_id.name);
    } catch (err) {
      console.error("Error fetching data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  const handleNavigate = useCallback(() => {
    setSelected(null);
    navigate(`/tutorcourse/${id}`);
    fetchCourseData();
  }, [id, navigate]);

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

            <div className="flex flex-row gap-3  overflow-y-auto">
              <SidebarComp
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
