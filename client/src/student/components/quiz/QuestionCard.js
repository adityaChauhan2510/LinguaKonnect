import React from "react";
import { Dialog, Box } from "@mui/material";
import Question from "./Question";
import Next_Submit_Button from "./Next_Submit_Button";

export default function QuestionCard({
  quiz,
  selectedOptions,
  setSelectedOptions,
  handleFinish,
  handleNextQuestion,
  currentQuestionIndex,
  timeLeft,
  open,
}) {
  return (
    <Dialog fullScreen open={open}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
        }}
      >
        <Question
          quiz={quiz}
          setSelectedOptions={setSelectedOptions}
          selectedOptions={selectedOptions}
          currentQuestionIndex={currentQuestionIndex}
          timeLeft={timeLeft}
        />

        <Next_Submit_Button
          quiz={quiz}
          handleFinish={handleFinish}
          handleNextQuestion={handleNextQuestion}
          currentQuestionIndex={currentQuestionIndex}
        />
      </Box>
    </Dialog>
  );
}
