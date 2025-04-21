import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Divider,
  Button,
} from "@mui/material";

const AnswersDialog = ({ open, onClose, selectedQuizDetails }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        Your Answers
      </DialogTitle>

      <DialogContent>
        {selectedQuizDetails ? (
          <>
            {/* 🏆 Score & Performance Section */}
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#1976d2" }}
              >
                Score: {selectedQuizDetails.userScore} /{" "}
                {selectedQuizDetails.quizDetails.questions.length}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color:
                    selectedQuizDetails.userScore ===
                    selectedQuizDetails.quizDetails.questions.length
                      ? "green"
                      : selectedQuizDetails.userScore >=
                        selectedQuizDetails.quizDetails.questions.length / 2
                      ? "orange"
                      : "red",
                  fontWeight: "bold",
                }}
              >
                {selectedQuizDetails.userScore ===
                selectedQuizDetails.quizDetails.questions.length
                  ? "🌟 Excellent! You got all correct!"
                  : selectedQuizDetails.userScore >=
                    selectedQuizDetails.quizDetails.questions.length / 2
                  ? "👍 Good Job! Keep practicing!"
                  : "🔴 Needs Improvement! Keep learning!"}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* 📝 Questions & Answers Section */}
            <List>
              {selectedQuizDetails.quizDetails.questions.map(
                (question, index) => {
                  const userResponse = selectedQuizDetails.userResponses.find(
                    (resp) => resp.questionId === question.id
                  );

                  return (
                    <ListItem key={index} divider sx={{ py: 2 }}>
                      <ListItemText
                        primary={
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", color: "#333" }}
                          >
                            Q{index + 1}: {question.title}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography sx={{ mb: 1 }}>
                              <b>Options:</b>
                              {question.options.map((opt, i) => (
                                <Box
                                  key={i}
                                  component="span"
                                  sx={{
                                    mx: 1,
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: "10px",
                                    backgroundColor: "#e0e0e0",
                                    display: "inline-block",
                                  }}
                                >
                                  {opt.value}
                                </Box>
                              ))}
                            </Typography>

                            <Typography sx={{ mb: 1 }}>
                              <b>Your Answer:</b>{" "}
                              <Box
                                component="span"
                                sx={{
                                  fontWeight: "bold",
                                  color: userResponse?.isCorrect
                                    ? "green"
                                    : "red",
                                }}
                              >
                                {userResponse?.selectedOption || "Not Answered"}
                                {userResponse?.isCorrect ? " ✅" : " ❌"}
                              </Box>
                            </Typography>

                            <Typography>
                              <b>Correct Answer:</b>{" "}
                              <Box
                                component="span"
                                sx={{ fontWeight: "bold", color: "blue" }}
                              >
                                {question.answer}
                              </Box>
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  );
                }
              )}
            </List>
          </>
        ) : (
          <Typography sx={{ textAlign: "center", py: 2 }}>
            No answers found.
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={onClose}
          color="primary"
          variant="contained"
          sx={{ px: 3, py: 1, borderRadius: "10px" }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnswersDialog;
