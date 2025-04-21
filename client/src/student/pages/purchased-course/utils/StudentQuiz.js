import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import QuizList from "../../../components/quiz/QuizList";
import axios from "axios";

export default function QuizPage() {
  const { course, id, fetchCourseData } = useOutletContext();
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/me`,
          { withCredentials: true }
        );
        setUserID(response.data.user._id);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/course/quizzes/delete/${id}`,
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error deleting quiz:", error);
    } finally {
      setLoading(false);
      fetchCourseData();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="px-10 overflow-y-auto w-full h-full">
      <h3 className="font-extrabold text-3xl text-center tracking-wider py-6 uppercase text-gray-800 drop-shadow-lg">
        Quizzes
      </h3>

      {loading ? (
        <p className="text-center text-gray-500 my-5 p-5">Loading quizzes...</p>
      ) : userID && course?.quizzes?.length > 0 ? (
        <QuizList course={course} userID={userID} id={id} />
      ) : (
        <div className="text-center text-gray-500 my-5 p-5">
          No quizzes available for this course...
          <p className="h-[20rem]"></p>
        </div>
      )}

      <div className="h-[20rem]"></div>
      <button onClick={handleDelete}> Delete</button>
    </div>
  );
}
