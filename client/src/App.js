import React from "react";
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
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "./index";

export default function App() {
  const { setUser, setIsAuthenticated, setLoading, setTutor, user, tutor } =
    useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/v1/user/me", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);

        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/v1/tutor/me", {
        withCredentials: true,
      })
      .then((res) => {
        setTutor(() => res.data.tutor);
        console.log(tutor);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        setTutor({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="tutorLogin" element={<TutorLogin />} />
        <Route path="tutorSignup" element={<TutorSignUp />} />
        <Route path="tutorhome" element={<TutorHome />} />
        <Route path="tutorprofile" element={<TutorProfile />} />
        <Route path="studenthome" element={<StudentHome />} />
        <Route path="studentprofile" element={<StudentProfile />} />
        <Route path="course/:id" element={<CourseDetails />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
