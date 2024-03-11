import React, { useState, useEffect, useContext } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/TNavbar.js";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import io from "socket.io-client";

import axios from "axios";

const socket = io.connect("http://localhost:5000");

/*
router.post('/send-video-chat-link/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { videoChatId } = req.body;

    // Logic to find all students enrolled in the course with courseId
    // This could be querying your database or any other method
    const students = await Student.find({ courseId });

    // Send the video chat link to each student
    students.forEach(async (student) => {
      // Assuming you have a method in your Student model to send the video chat link
      await student.sendVideoChatLink(videoChatId);
    });

    res.status(200).json({ message: 'Video chat link sent to all students' });
  } catch (error) {
    console.error('Error sending video chat link:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


*/

export default function TutorCourseDetails() {
  const [courseDetails, setCourseDetails] = useState({});
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  //console.log(userName);

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

        console.log(response.data.result);
        setCourseDetails(response.data.result);
        setUserName(response.data.result.tutor_id.name);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  }, [chat, setChat]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
  };

  const handleDeleteCourse = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/v1/course/${id}`,
        {
          withCredentials: true,
        }
      );

      //console.log(data);
      toast.success(data.message);
    } catch (error) {
      toast.error("Error deleting course:", error);
    } finally {
      setLoading(false);
      navigate("/tutorhome");
    }
  };
  // const handleSendLink = () => {

  //   axios
  //     .post("your_backend_url", { videoChatId })
  //     .then((response) => {
  //       console.log("Video chat ID sent to all students");
  //     })
  //     .catch((error) => {
  //       console.error("Error sending video chat ID:", error);
  //     });
  // };

  if (loading) return <div className="text-xl mx-10 mt-10">Loaading...</div>;
  return (
    <>
      <Navbar />
      {courseDetails && (
        <>
          <div className="mt-10 mx-10">
            <h1 className="text-3xl font-bold">{courseDetails.name}</h1>
            <div className="flex gap-4 mt-10">
              <div className="h-[20rem] w-[30rem] bg-gray-200">
                video-call-to-all-feature
              </div>

              <div className="mx-10">
                <h2 className="text-2xl">Message to all enrolled students</h2>
                <form onSubmit={handleFormSubmit}>
                  <div className="flex flex-row gap-4">
                    <input
                      type="text"
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="border border-gray-300 rounded px-2 my-3"
                    />
                    <div className="px-2 my-3">
                      <Button variant="contained" color="primary" type="submit">
                        Send Message
                      </Button>
                    </div>
                  </div>
                </form>
                {chat.map((payload, index) => (
                  <p key={index}>
                    {payload.message} :{" "}
                    <span className="font-bold px-5">{payload.userName}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="my-5">
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteCourse}
              >
                Delete Course
              </Button>
            </div>
          </div>
        </>
      )}
      <Toaster />
    </>
  );
}
