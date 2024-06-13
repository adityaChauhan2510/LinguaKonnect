import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import Navbar from "../components/TNavbar.js";

import io from "socket.io-client";
import axios from "axios";

import SidebarComp from "../components/SidebarComp.js";
import { Footer } from "../components/Footer.js";
const URI = "https://linguakonnect.onrender.com";

const socket = io("http://localhost:5000", {
  autoConnect: false,
});

export default function TutorCourseDetails() {
  const [course, setCourse] = useState({});
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/course/${id}`,
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

    fetchData();
  }, [id, setCourse]);

  const handleNavigate = useCallback(() => {
    navigate(`/tutorcourse/${id}`);
  }, [id, navigate]);

  // useEffect(() => {
  //   socket.on("chat", (payload) => {
  //     setChat((prevChat) => [...prevChat, payload]);
  //   });

  //   return () => {
  //     socket.off("chat");
  //   };
  // }, [chat, setChat]);

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   socket.emit("chat", { message, userName, roomId: id });
  //   setMessage("");
  // };

  // const handleDeleteCourse = async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await axios.delete(
  //       `http://localhost:8000/api/v1/course/${id}`,
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     //console.log(data);
  //     toast.success(data.message);
  //   } catch (error) {
  //     toast.error("Error deleting course:", error);
  //   } finally {
  //     setLoading(false);
  //     navigate("/tutorhome");
  //   }
  // };

  // const handleChat = () => {
  //   if (!started) {
  //     socket.connect();
  //     socket.emit("joinRoom", id);
  //     toast.success("Class started. Students can now join the room.");
  //   } else {
  //     socket.emit("ec", id);
  //     toast.success("Class ended.");
  //   }
  //   setStarted(!started);
  // };

  if (loading) return <div className="text-xl mx-10 mt-10">Loading...</div>;
  return (
    <>
      {course && (
        <>
          <Navbar />
          <div className="mx-5">
            <h1
              className="text-3xl font-extrabold my-5 cursor-pointer"
              onClick={handleNavigate}
            >
              {course.name}
            </h1>
            <hr className="my-2 border-t border-gray-300" />

            <div className="flex flex-row gap-3  overflow-y-auto">
              <SidebarComp id={id} course={course} />
              <Outlet
                context={{ id, course }}
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
