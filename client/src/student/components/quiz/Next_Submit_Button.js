import React from "react";
import { Button } from "@mui/material";

export default function Next_Submit_Button({
  quiz,
  handleFinish,
  handleNextQuestion,
  currentQuestionIndex,
}) {
  return (
    <div className="flex justify-end mt-6 space-x-4">
      {currentQuestionIndex < quiz.questions.length - 1 ? (
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            paddingX: 4,
            paddingY: 1.5,
            borderRadius: 2,
            fontWeight: "bold",
            textTransform: "none",
            transition: "all 0.3s",
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1565c0",
              transform: "scale(1.05)",
            },
          }}
          onClick={() => handleNextQuestion(false)}
        >
          Next ➡
        </Button>
      ) : (
        <Button
          variant="contained"
          color="error"
          size="large"
          sx={{
            paddingX: 4,
            paddingY: 1.5,
            borderRadius: 2,
            fontWeight: "bold",
            textTransform: "none",
            transition: "all 0.3s",
            backgroundColor: "#d32f2f",
            "&:hover": {
              backgroundColor: "#b71c1c",
              transform: "scale(1.05)",
            },
          }}
          onClick={() => handleFinish(false)}
        >
          🏁 Finish Quiz
        </Button>
      )}
    </div>
  );
}
