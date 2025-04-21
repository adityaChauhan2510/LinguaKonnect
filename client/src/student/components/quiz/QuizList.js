import { useState, useEffect } from "react";
import QuizAttempt from "./QuizAttempt";
import AnswersDialog from "./AnswersDialog";
import QuizAnalyticsDialog from "./QuizAnalyticsDialog";
import WarningDialog from "./WarningDialog";
import QuizCard from "./QuizCard";
import axios from "axios";

export default function QuizList({ course, userID, id }) {
  const [attemptedQuizzes, setAttemptedQuizzes] = useState(new Set());
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizToStart, setQuizToStart] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [selectedQuizDetails, setSelectedQuizDetails] = useState(null);
  const [showAnswersDialog, setShowAnswersDialog] = useState(false);
  const [showAnalyticsDialog, setShowAnalyticsDialog] = useState(false);
  const [analyticsQuiz, setAnalyticsQuiz] = useState(null);

  useEffect(() => {
    const fetchAttemptedQuizzes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/course/attempted-quizzes/${userID}`,
          { withCredentials: true }
        );
        setAttemptedQuizzes(new Set(response.data.attemptedQuizIds));
      } catch (error) {
        console.error("Error fetching attempted quizzes:", error);
      }
    };

    fetchAttemptedQuizzes();
  }, []);

  const handleStartQuiz = () => {
    setSelectedQuiz(quizToStart);
    setShowWarning(false);
  };

  const handleFinishQuiz = async () => {
    setSelectedQuiz(null);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/course/attempted-quizzes/${userID}`,
        { withCredentials: true }
      );
      setAttemptedQuizzes(new Set(response.data.attemptedQuizIds));
    } catch (error) {
      console.error("Error refetching quizzes:", error);
    }
  };

  const handleSeeAnswers = async (quizId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/course/answers/${quizId}`,
        { userID, id },
        { withCredentials: true }
      );
      setSelectedQuizDetails(response.data);
      setShowAnswersDialog(true);
    } catch (error) {
      console.error("Error fetching quiz answers:", error);
    }
  };

  return (
    <div className="m-5">
      {selectedQuiz ? (
        <QuizAttempt
          quiz={selectedQuiz}
          onFinish={handleFinishQuiz}
          userID={userID}
          id={id}
        />
      ) : (
        <QuizCard
          course={course}
          attemptedQuizzes={attemptedQuizzes}
          handleSeeAnswers={handleSeeAnswers}
          setAnalyticsQuiz={setAnalyticsQuiz}
          setShowAnalyticsDialog={setShowAnalyticsDialog}
          setQuizToStart={setQuizToStart}
          setShowWarning={setShowWarning}
        />
      )}

      {/* Warning Dialog */}
      <WarningDialog
        showWarning={showWarning}
        setShowWarning={setShowWarning}
        handleStartQuiz={handleStartQuiz}
      />

      {/* Answers Dialog */}
      <AnswersDialog
        open={showAnswersDialog}
        onClose={() => setShowAnswersDialog(false)}
        selectedQuizDetails={selectedQuizDetails}
      />

      {/* Quiz Analytics Dialog */}
      {analyticsQuiz && (
        <QuizAnalyticsDialog
          quiz={analyticsQuiz}
          id={id}
          onClose={() => {
            setShowAnalyticsDialog(false);
            setAnalyticsQuiz(null);
          }}
        />
      )}
    </div>
  );
}
