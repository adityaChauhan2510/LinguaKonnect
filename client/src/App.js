import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import TutorLogin from "./pages/TutorLogin.js";
import Signup from "./pages/Signup";
import TutorSignUp from "./pages/TutorSignUp.js";
import TutorHome from "./tutor/pages/TutorHome";
import StudentHome from "./student/pages/StudentHome";
import MyCart from "./student/pages/MyCart.js";
import TutorProfile from "./tutor/pages/TutorProfile";
import CourseDetails from "./student/pages/CourseDetails";
import TutorCourseDetails from "./tutor/pages/TutorCourseDetails.js";
import { Toaster } from "react-hot-toast";

export default function App() {
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
        <Route path="mycart" element={<MyCart />} />
        <Route path="course/:id" element={<CourseDetails />} />
        <Route path="tutorcourse/:id" element={<TutorCourseDetails />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
