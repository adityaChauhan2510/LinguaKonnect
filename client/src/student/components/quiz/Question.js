import React from "react";
import { Button, Typography, Dialog, LinearProgress, Box } from "@mui/material";

export default function Question({
  quiz,
  setSelectedOptions,
  selectedOptions,
  currentQuestionIndex,
  timeLeft,
}) {
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalTime = currentQuestion.timeLimit;

  return (
    <Box
      sx={{
        width: "90%",
        maxWidth: 600,
        padding: 4,
        borderRadius: 3,
        backgroundColor: "white",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography
          variant="body2"
          sx={{
            fontSize: 14,
            fontWeight: "bold",
            color: "#555",
            background: "#e3f2fd",
            padding: "4px 10px",
            borderRadius: "20px",
          }}
        >
          {currentQuestionIndex + 1}/{quiz.questions.length}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontSize: 14,
            fontWeight: "bold",
            color: timeLeft <= 5 ? "#d32f2f" : "#1976d2",
            background: timeLeft <= 5 ? "#ffebee" : "#e3f2fd",
            padding: "4px 10px",
            borderRadius: "20px",
          }}
        >
          ⏳ {timeLeft}s
        </Typography>
      </Box>

      {/* Timer Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={(timeLeft / totalTime) * 100}
        sx={{
          height: 8,
          borderRadius: 4,
          marginBottom: 3,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            backgroundColor: timeLeft <= 5 ? "#d32f2f" : "#1976d2",
          },
        }}
      />

      {/* Question Text */}
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "#333", marginBottom: 2 }}
      >
        {currentQuestion.title}
      </Typography>

      {/* Options */}
      <Box display="grid" gap={2}>
        {currentQuestion.options.map((option) => (
          <Button
            key={option.id}
            variant={
              selectedOptions[currentQuestionIndex] === option.id
                ? "contained"
                : "outlined"
            }
            fullWidth
            sx={{
              paddingY: 1.5,
              borderRadius: 2,
              borderColor:
                selectedOptions[currentQuestionIndex] === option.id
                  ? "#1565c0"
                  : "#90caf9",
              backgroundColor:
                selectedOptions[currentQuestionIndex] === option.id
                  ? "#1565c0"
                  : "transparent",
              color:
                selectedOptions[currentQuestionIndex] === option.id
                  ? "#fff"
                  : "#333",
              "&:hover": {
                backgroundColor:
                  selectedOptions[currentQuestionIndex] === option.id
                    ? "#0d47a1"
                    : "#e3f2fd",
              },
            }}
            onClick={() => {
              setSelectedOptions((prev) => {
                return prev.map((optionId, index) =>
                  index === currentQuestionIndex
                    ? optionId === option.id
                      ? 0
                      : option.id
                    : optionId
                );
              });
            }}
          >
            {option.value}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
