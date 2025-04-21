import { useState } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import QuizAnalyticsDialog from "./QuizAnalyticsDialog";
import { formatDistanceToNow } from "date-fns";

const QuizList = ({ course, id }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
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

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setSelectedQuiz(quiz)}
              >
                View Analytics
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
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedQuiz && (
        <QuizAnalyticsDialog
          quiz={selectedQuiz}
          onClose={() => setSelectedQuiz(null)}
          id={id}
        />
      )}
    </>
  );
};

export default QuizList;
