import React, { useState, useEffect, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import Navbar from "../components/TNavbar.js";
import { Button } from "@mui/material";
import VideoChat from "../components/VideoChat.js";

import axios from "axios";
import { Context } from "../../index.js";

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
  const { tutor, isAuthenticated } = useContext(Context);
  const [videoChatId, setVideoChatId] = useState("");
  const { id } = useParams();

  const handleSendLink = () => {
    // Send video chat ID to all students
    // You can use axios or any other method to send the ID to the backend
    axios
      .post("your_backend_url", { videoChatId })
      .then((response) => {
        console.log("Video chat ID sent to all students");
      })
      .catch((error) => {
        console.error("Error sending video chat ID:", error);
      });
  };

  return (
    <>
      <Navbar />
      <h1 className="mt-5 mx-10 text-3xl font-bold">COURSE_NAME</h1>

      <div className="flex gap-4 mx-10 mt-10">
        <VideoChat />
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
            onClick={handleSendLink}
            className="mt-5 mx-3"
          >
            Send Link
          </Button>
        </div>
      </div>
    </>
  );
}
