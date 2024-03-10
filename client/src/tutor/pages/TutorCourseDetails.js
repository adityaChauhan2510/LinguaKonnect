import React, { useState, useEffect, useContext } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/TNavbar.js";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";

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
  const [videoChatId, setVideoChatId] = useState("");
  const [loading, setLoading] = useState(false);
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

        console.log(response.data.result);
        setCourseDetails(response.data.result);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              {/* <VideoChat /> */}
              <div className="h-[20rem] w-[30rem] bg-gray-200">
                video-call-to-all-feature
              </div>

              <div className="mx-10 flex flex-col">
                <h2 className="text-2xl">Send link to all students</h2>
                <input
                  type="text"
                  placeholder="Paste video chat ID here"
                  value={videoChatId}
                  onChange={(e) => setVideoChatId(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 my-3"
                />
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleSendLink}
                  className="mt-5 mx-3"
                >
                  Send Link
                </Button>
              </div>
            </div>

            <div className="mt-5">
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
