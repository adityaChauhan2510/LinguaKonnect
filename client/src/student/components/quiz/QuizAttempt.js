import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";
import axios from "axios";
import QuestionCard from "./QuestionCard";
import ResultDialog from "./ResultDialog";
import QuestionWarningDialog from "./QuestionWarningDialog";

const QuizAttempt = ({ quiz, onFinish, userID, id }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    new Array(quiz.questions.length).fill(0) // Default all options to 0
  );
  const [timeLeft, setTimeLeft] = useState(quiz.questions[0].timeLimit);
  const [showWarning, setShowWarning] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [open, setOpen] = useState(true);
  const [score, setScore] = useState(null);

  const submitQuiz = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/course/submit-quiz/${quiz._id}`,
        { id, userID, responses: selectedOptions },
        { withCredentials: true }
      );
      setScore(res.data.score);
      setShowResultDialog(true);
    } catch (error) {
      console.error("Error submitting quiz result:", error.message);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          if (currentQuestionIndex === quiz.questions.length - 1) {
            handleFinish(true); // Auto-finish if last question
          } else {
            handleNextQuestion(true); // Auto-move if time is up
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (quizCompleted) {
      submitQuiz();
    }
  }, [quizCompleted]);

  const handleNextQuestion = (autoMove = false) => {
    const isOptionSelected = selectedOptions[currentQuestionIndex] !== 0;

    if (!autoMove && !isOptionSelected) {
      setShowWarning(true);
      return;
    }

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(quiz.questions[currentQuestionIndex + 1].timeLimit);
    }
  };

  const handleFinish = async (autoFinish = false) => {
    const isOptionSelected = selectedOptions[currentQuestionIndex] !== 0;

    if (!autoFinish && !isOptionSelected) {
      setShowWarning(true);
      return;
    }

    setSelectedOptions((prev) => [...prev]);
    setQuizCompleted(true);
  };

  return (
    <>
      <QuestionCard
        quiz={quiz}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        handleFinish={handleFinish}
        handleNextQuestion={handleNextQuestion}
        currentQuestionIndex={currentQuestionIndex}
        timeLeft={timeLeft}
        open={open}
      />

      {/* Question Warning Dialog */}
      <QuestionWarningDialog
        showWarning={showWarning}
        setShowWarning={setShowWarning}
        handleNextQuestion={handleNextQuestion}
      />

      {/* Result Dialog */}
      <ResultDialog
        showResultDialog={showResultDialog}
        score={score}
        onFinish={onFinish}
      />
    </>
  );
};

export default QuizAttempt;
