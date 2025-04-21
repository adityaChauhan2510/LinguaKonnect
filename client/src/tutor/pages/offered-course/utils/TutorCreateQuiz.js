import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Question from "../../../components/quiz/Question";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import WatchLoader from "../../../../shared-ui/WatchLoader";
import toast from "react-hot-toast";
import axios from "axios";
import QuizList from "../../../components/quiz/QuizList";
import { FaRegClock, FaClipboardList } from "react-icons/fa";

export default function CreateQuiz() {
  const { course, id, fetchCourseData } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    type: "MCQ",
    questions: [],
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    id: 1,
    title: "",
    options: [],
    answer: null,
    timeLimit: 20, // Default time limit of 60 seconds
  });

  const addQuestion = () => {
    if (!quiz.title.trim()) {
      alert("Please enter a Quiz Title before adding questions.");
      return;
    }
    if (
      !currentQuestion.title ||
      currentQuestion.options.length < 2 ||
      currentQuestion.answer === null ||
      currentQuestion.timeLimit <= 0
    ) {
      alert(
        "Please enter a question, at least two options, select an answer, and set a valid time limit."
      );
      return;
    }

    if (currentQuestion.options.some((option) => !option.value.trim())) {
      alert("Please fill in all the options before adding the question.");
      return;
    }

    if (currentQuestion.timeLimit < 20 || currentQuestion.timeLimit > 120) {
      alert("Time limit must be between 20 and 120 seconds.");
      return;
    }
    setQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, currentQuestion],
    }));
    setCurrentQuestion({
      id: currentQuestion.id + 1,
      title: "",
      options: [],
      answer: null,
      timeLimit: 20, // Default time limit
    });
  };

  const handleQuizSubmit = () => {
    if (quiz.questions.some((q) => q.timeLimit < 20 || q.timeLimit > 60)) {
      alert("Each question's time limit must be between 20 and 60 seconds.");
      return;
    }
    setShowConfirmation(true);
  };

  const confirmQuiz = async () => {
    try {
      console.log("Final Quiz Data:", quiz);

      if (!quiz.title || !quiz.type || !quiz.questions.length) {
        alert("Please provide all quiz details");
        return;
      }

      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/course/create-quiz/${id}`,
        quiz,
        { withCredentials: true }
      );

      toast.success(response.data.message);
      await fetchCourseData();
    } catch (err) {
      console.log(err);
    } finally {
      setShowQuizForm(false);
      setShowConfirmation(false);
      setLoading(false);
    }
  };

  const discardQuiz = () => {
    setQuiz({ title: "", description: "", type: "MCQ", questions: [] });
    setShowQuizForm(false);
    setShowConfirmation(false);
  };

  if (loading)
    return (
      <div className="mx-auto">
        <h1 className="text-2xl p-5 text-center font-bold">Creating...</h1>
        <WatchLoader />
      </div>
    );

  return (
    <div className="px-10 overflow-y-auto w-full h-full">
      <h3 className="font-extrabold text-3xl text-center tracking-wider py-6 uppercase text-gray-800 drop-shadow-lg">
        Quizzes
      </h3>

      {!showQuizForm && (
        <>
          {course?.quizzes?.length > 0 ? (
            <QuizList course={course} id={id} />
          ) : (
            <p className="text-center text-gray-500 my-5 p-5">
              No quizzes available for this course.
            </p>
          )}

          {/* EMPTY DIV */}
          <div className="h-[10rem]"></div>
          <div className="text-center mt-6 bottom-0 mx-auto">
            <button
              className="px-6 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700"
              onClick={() => setShowQuizForm(true)}
            >
              <strong>+</strong> Create New Quiz
            </button>
          </div>

          {/* EMPTY-DIV */}
          <div className="h-[3rem]"></div>
        </>
      )}

      {showQuizForm && !showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 overflow-y-scroll h-screen">
          <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-lg shadow-lg p-8 relative animate-fadeIn max-h-[80vh] overflow-y-auto">
            {/* Close Button (Top Right) */}
            <button
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200 shadow-md"
              onClick={discardQuiz}
            >
              &times;
            </button>

            {/* Quiz Title Input */}
            <input
              type="text"
              placeholder="**Quiz Title (Required)**"
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none my-3"
            />

            {/* Quiz Description Input */}
            <input
              type="text"
              placeholder="Quiz Description"
              value={quiz.description}
              onChange={(e) =>
                setQuiz({ ...quiz, description: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />

            {/* Add Question Section */}
            <h2 className="font-extrabold mt-5 text-xl text-center tracking-wider py-3 text-gray-800 drop-shadow-lg">
              Add Question
            </h2>
            <Question
              question={currentQuestion}
              setQuestion={setCurrentQuestion}
            />

            {/* Time Limit Input with Icon */}

            <div className="w-full mt-6">
              {/* Heading for Time Limit */}
              <h3 className="font-extrabold mt-5 text-xl text-center tracking-wider py-3 text-gray-800 drop-shadow-lg">
                Add Question Time
              </h3>

              <div className="relative w-full">
                {/* Input for Time Limit */}
                <input
                  type="number"
                  placeholder="Time Limit (seconds)"
                  value={currentQuestion.timeLimit || ""}
                  onChange={(e) => {
                    let value = e.target.value;
                    setCurrentQuestion({
                      ...currentQuestion,
                      timeLimit: value,
                    });
                  }}
                  className="w-full p-4 pr-12 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 placeholder-gray-500"
                />
                {/* Timer Icon */}
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <FaRegClock className="text-xl" />
                </span>
                {/* "sec" Text */}
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  sec
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between my-6">
              <button
                className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                onClick={addQuestion}
              >
                + Add Question
              </button>
              <button
                className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                onClick={() => {
                  setCurrentQuestion({
                    id: currentQuestion.id,
                    title: "",
                    options: [],
                    answer: null,
                    timeLimit: 20,
                  });
                }}
              >
                Clear Question
              </button>
            </div>

            {/* Submit Button */}
            {quiz.questions.length > 0 && (
              <div className="text-center mt-6">
                <button
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md"
                  onClick={handleQuizSubmit}
                >
                  Submit Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Dialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        maxWidth="lg"
        fullWidth
      >
        <h1 className="font-extrabold text-2xl text-center tracking-wider py-6 uppercase text-gray-800 drop-shadow-lg underline">
          Confirm Quiz
        </h1>
        <DialogContent className="p-6 bg-gray-50">
          <div className="bg-white shadow-lg p-6 rounded-xl border border-gray-200">
            {/* Quiz Title */}
            <h2 className="text-xl font-bold text-gray-900 py-3 flex items-center">
              <FaClipboardList className="text-indigo-600 mr-3 text-lg" />
              <strong className="mr-1">Quiz Title :</strong>
              {quiz.title || "Untitled Quiz"}
            </h2>

            {/* Quiz Description */}
            <p className="text-gray-800 text-base flex items-center mb-4">
              <FaRegClock className="text-blue-600 mr-3 text-lg" />
              <strong className="mr-1">Quiz Description :</strong>
              <span className="text-gray-600 italic">
                {quiz.description || "N/A"}
              </span>
            </p>

            {/* Questions List */}
            <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-700 mb-4">
                Questions:
              </h3>
              <ul className="space-y-4">
                {quiz.questions.map((q, i) => (
                  <li
                    key={q.id}
                    className="bg-gray-100 p-4 rounded-md shadow-sm relative border-l-4 border-blue-500"
                  >
                    {/* Question Number on Top Left */}
                    <span className="absolute -top-2 -left-2 bg-blue-500 text-white font-bold px-3 py-1 rounded-full text-sm">
                      {i + 1}
                    </span>

                    {/* Question Title */}
                    <p className="text-lg font-semibold text-gray-800 mt-2">
                      {q.title}
                    </p>

                    {/* Options */}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {q.options.map((option, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            option.id === q.answer
                              ? "bg-blue-200 text-blue-800 border border-blue-400"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {option.value}
                        </span>
                      ))}
                    </div>

                    {/* Correct Answer */}
                    <p className="mt-2 text-sm text-gray-600">
                      <b>Correct Answer:</b>{" "}
                      <span className="px-3 py-1 rounded-full text-sm font-bold text-green-800 bg-green-200 border border-green-400 inline-block">
                        {q.options.find((o) => o.id === q.answer)?.value ||
                          "N/A"}
                      </span>
                    </p>

                    {/* Time Limit */}
                    <p className="mt-2 text-sm text-gray-600 flex items-center">
                      <FaRegClock className="text-gray-500 mr-2" />
                      <b>Time Limit:</b>{" "}
                      <span className="ml-1 text-gray-700">
                        {q.timeLimit} sec
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-6 space-x-3">
            <Button
              variant="contained"
              color="primary"
              className="bg-green-600 hover:bg-green-700"
              onClick={confirmQuiz}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="bg-red-500 hover:bg-red-600"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
