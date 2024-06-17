import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TutorHome from "./tutor/pages/TutorHome";
import StudentHome from "./student/pages/StudentHome";
import MyCart from "./student/pages/MyCart.js";
import TutorProfile from "./tutor/pages/TutorProfile";
import CourseDetails from "./student/pages/CourseDetails";
import TutorCourseDetails from "./tutor/pages/TutorCourseDetails.js";
import { Toaster } from "react-hot-toast";

import CourseHome from "./tutor/pages/CourseHome.js";

import ChapterPage from "./tutor/pages/ChapterPage.js";
import UploadNewChapter from "./tutor/pages/UploadNewChapter.js";
import CoursePage from "./student/pages/CoursePage.js";
import CourseDashboard from "./student/pages/CourseDashboard.js";
import ChapterContent from "./student/pages/ChapterContent.js";
import LandingPage from "./shared-pages/Landing.js";
import Login from "./shared-pages/Login.js";
import SignUp from "./shared-pages/Signup.js";
import TutorLogin from "./shared-pages/TutorLogin.js";
import TutorSignUp from "./shared-pages/TutorSignUp.js";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="tutorlogin" element={<TutorLogin />} />
        <Route path="tutorsignup" element={<TutorSignUp />} />
        <Route path="tutorhome" element={<TutorHome />} />
        <Route path="tutorprofile" element={<TutorProfile />} />

        <Route path="tutorcourse/:id" element={<TutorCourseDetails />}>
          <Route path="" element={<CourseHome />} />
          <Route path="new" element={<UploadNewChapter />} />
          <Route path=":chapter" element={<ChapterPage />} />
        </Route>

        <Route path="studenthome" element={<StudentHome />} />
        <Route path="mycart" element={<MyCart />} />
        <Route path="course/:id" element={<CourseDetails />} />
        <Route path="purchased/:id" element={<CoursePage />}>
          <Route path="" element={<CourseDashboard />} />
          <Route path=":chapter" element={<ChapterContent />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
