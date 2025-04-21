import React from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function QuestionWarningDialog({
  showWarning,
  setShowWarning,
  handleNextQuestion,
}) {
  return (
    <Dialog open={showWarning} onClose={() => setShowWarning(false)}>
      <DialogTitle>Warning</DialogTitle>
      <DialogContent>
        <Typography>
          You haven't selected an answer. If you continue, you cannot return to
          this question, and 0 points will be added. Do you still wish to move
          to the next question?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setShowWarning(false)}
          color="primary"
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setShowWarning(false);
            handleNextQuestion(true);
          }}
          color="secondary"
          variant="contained"
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
