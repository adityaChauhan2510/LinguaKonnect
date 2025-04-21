import React from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { formatDistanceToNow } from "date-fns";

export default function QuizCard({
  course,
  attemptedQuizzes,
  handleSeeAnswers,
  setAnalyticsQuiz,
  setShowAnalyticsDialog,
  setQuizToStart,
  setShowWarning,
}) {
  return (
    <Grid container spacing={3}>
      {course.quizzes.map((quiz, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            elevation={4}
            sx={{
              p: 2,
              borderRadius: 3,
              height: 250,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(/images/quiz_img2.jpg)`,
              transition: "transform 0.3s ease-in-out",
              ...(attemptedQuizzes.has(quiz._id)
                ? {}
                : {
                    "&:hover": {
                      transform: "scale(1.05)", // Slightly increase size on hover
                      boxShadow: "0px 4px 15px rgba(0,0,0,0.2)", // Add shadow for a pop effect
                    },
                  }),
            }}
          >
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                top: 8,
                left: 12,
                fontSize: "0.75rem",
                fontWeight: "bold",
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "white",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
            >
              Quiz {index + 1}
            </Typography>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  color: "white",
                  textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
                  margin: 2,
                  pt: 3, // Increased top padding,
                  textTransform: "uppercase",
                }}
              >
                {quiz.title}
              </Typography>
            </CardContent>

            {attemptedQuizzes.has(quiz._id) ? (
              <div className="flex flex-col gap-2">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleSeeAnswers(quiz._id)}
                >
                  See Answers
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => {
                    setAnalyticsQuiz(quiz);
                    setShowAnalyticsDialog(true);
                  }}
                >
                  Show Analytics
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    setQuizToStart(quiz);
                    setShowWarning(true);
                  }}
                >
                  Start Quiz
                </Button>
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    top: 8, // Move to top
                    right: 12, // Align to the right
                    fontSize: "0.75rem",
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                  }}
                >
                  Created{" "}
                  {formatDistanceToNow(new Date(quiz.createdAt), {
                    addSuffix: true,
                  })}
                </Typography>
              </>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
