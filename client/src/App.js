import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import TutorLogin from "./pages/TutorLogin.js";
import Signup from "./pages/Signup";
import TutorSignUp from "./pages/TutorSignUp.js";
import TutorHome from "./tutor/pages/TutorHome";
import StudentHome from "./student/pages/StudentHome";
import StudentProfile from "./student/pages/StudentProfile";
import TutorProfile from "./tutor/pages/TutorProfile";
import CourseDetails from "./student/pages/CourseDetails";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { Context } from "./index";
import TutorCourseDetails from "./tutor/pages/TutorCourseDetails.js";

export default function App() {
  const { setUser, setIsAuthenticated, setLoading, setTutor, user } =
    useContext(Context);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/me",
          {
            withCredentials: true,
          }
        );
        console.log("User data response:", response.data);
        setUser(response.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser({});
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [setUser, setIsAuthenticated, setLoading]);

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/v1/tutor/me", {
          withCredentials: true,
        });
        console.log("Tutor data response:", response.data);
        setTutor(response.data.tutor);
        setIsAuthenticated(true);
      } catch (error) {
        setTutor({});
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorData();
  }, [setTutor, setIsAuthenticated, setLoading]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="tutorlogin" element={<TutorLogin />} />
        <Route path="tutorsignup" element={<TutorSignUp />} />
        <Route path="tutorhome" element={<TutorHome />} />
        <Route path="tutorprofile" element={<TutorProfile />} />
        <Route path="studenthome" element={<StudentHome />} />
        <Route path="studentprofile" element={<StudentProfile />} />
        <Route path="course/:id" element={<CourseDetails />} />
        <Route path="tutorcourse/:id" element={<TutorCourseDetails />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
