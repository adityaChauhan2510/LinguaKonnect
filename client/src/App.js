import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TutorHome from "./tutor/pages/TutorHome";
import StudentHome from "./student/pages/StudentHome";
import StudentProfile from "./student/pages/StudentProfile";
import TutorProfile from "./tutor/pages/TutorProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route path="tutorhome" element={<TutorHome />} />
        <Route path="tutorprofile" element={<TutorProfile/>}/>
        <Route path="studenthome" element={<StudentHome />} />
        <Route path="studentprofile" element={<StudentProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
