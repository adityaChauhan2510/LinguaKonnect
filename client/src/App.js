import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//student-pages
import StudentLogin from "./shared-pages/StudentLogin.js";
import StudentSignUp from "./shared-pages/StudentSignUp.js";
import StudentDashboard from "./student/pages/home-page/StudentDashboard.js";
import CartPage from "./student/pages/home-page/CartPage.js";
import CourseOverview from "./student/pages/course-info/CourseOverview.js";
import PurchasedCourse from "./student/pages/purchased-course/PurchasedCourse.js";
import StudentChapter from "./student/pages/purchased-course/utils/StudentChapter.js";
import StudentLiveClass from "./student/pages/purchased-course/utils/StudentLiveClass.js";
import StudentQuiz from "./student/pages/purchased-course/utils/StudentQuiz.js";
import StudentCourseHome from "./student/pages/purchased-course/utils/StudentCourseHome.js";

//tutor-pages
import TutorLoginPage from "./shared-pages/TutorLogin.js";
import TutorSignUpPage from "./shared-pages/TutorSignUp.js";
import TutorDashboard from "./tutor/pages/home-page/TutorDashboard.js";
import TutorProfilePage from "./tutor/pages/home-page/TutorProfilePage.js";
import OfferedCourse from "./tutor/pages/offered-course/OfferedCourse.js";
import TutorCourseHome from "./tutor/pages/offered-course/utils/TutorCourseHome.js";
import TutorChapter from "./tutor/pages/offered-course/utils/TutorChapter.js";
import AddNewChapter from "./tutor/pages/offered-course/utils/AddNewChapter.js";
import TutorLiveClass from "./tutor/pages/offered-course/utils/TutorLiveClass.js";
import TutorCreateQuiz from "./tutor/pages/offered-course/utils/TutorCreateQuiz.js";

import Landing from "./shared-pages/Landing.js";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="login" element={<StudentLogin />} />
        <Route path="signup" element={<StudentSignUp />} />
        <Route path="tutorlogin" element={<TutorLoginPage />} />
        <Route path="tutorsignup" element={<TutorSignUpPage />} />

        <Route path="tutorhome" element={<TutorDashboard />} />
        <Route path="tutorprofile" element={<TutorProfilePage />} />
        <Route path="tutorcourse/:id" element={<OfferedCourse />}>
          <Route path="" element={<TutorCourseHome />} />
          <Route path="new" element={<AddNewChapter />} />
          <Route path="live-class" element={<TutorLiveClass />} />
          <Route path="create-quiz" element={<TutorCreateQuiz />} />
          <Route path=":chapter" element={<TutorChapter />} />
        </Route>

        <Route path="studenthome" element={<StudentDashboard />} />
        <Route path="mycart" element={<CartPage />} />
        <Route path="course/:id" element={<CourseOverview />} />
        <Route path="purchased/:id" element={<PurchasedCourse />}>
          <Route path="" element={<StudentCourseHome />} />
          <Route path="join-live-class" element={<StudentLiveClass />} />
          <Route path=":chapter" element={<StudentChapter />} />
          <Route path="quiz" element={<StudentQuiz />} />
        </Route>
      </Routes>
      {/* <Toaster /> */}
    </BrowserRouter>
  );
}
