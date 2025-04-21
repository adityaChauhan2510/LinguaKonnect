import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function WarningDialog({
  showWarning,
  setShowWarning,
  handleStartQuiz,
}) {
  return (
    <Dialog open={showWarning} onClose={() => setShowWarning(false)}>
      <DialogTitle>Start Quiz</DialogTitle>
      <DialogContent>
        <Typography>
          Are you <strong>sure</strong> you want to start this quiz ? 🤔🤔
        </Typography>
        <Typography>
          Once started you cannot stop until you finish this quiz.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setShowWarning(false)}
          color="secondary"
          variant="contained"
        >
          Cancel
        </Button>
        <Button onClick={handleStartQuiz} color="primary" variant="contained">
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}
