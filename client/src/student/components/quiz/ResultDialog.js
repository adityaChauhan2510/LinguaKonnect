import React from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import { FaRegSmileWink } from "react-icons/fa";

export default function ResultDialog({ showResultDialog, score, onFinish }) {
  return (
    <Dialog
      open={showResultDialog}
      onClose={onFinish}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 4,
          padding: 3,
          textAlign: "center",
          background: "linear-gradient(135deg, #ffffff, #f1f8ff)",
          boxShadow: "0px 5px 20px rgba(0,0,0,0.2)",
        },
      }}
    >
      {/* Title with Celebration Icon */}
      <DialogTitle sx={{ fontWeight: "bold", fontSize: 24, color: "#1565c0" }}>
        <FaRegSmileWink
          style={{ fontSize: "32px", color: "#ff9800", marginBottom: "-5px" }}
        />{" "}
        Quiz Completed!
      </DialogTitle>

      <DialogContent>
        <Typography variant="h6" sx={{ color: "#333", marginBottom: 2 }}>
          🎉 Thank you for taking the quiz! We hope you enjoyed it.
        </Typography>

        <Box
          sx={{
            backgroundColor: "#e3f2fd",
            borderRadius: 3,
            padding: 2,
            display: "inline-block",
            minWidth: "50%",
          }}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#1976d2" }}>
            Your Score:{" "}
            <span style={{ color: "#d32f2f" }}>
              {score !== null ? score : "Calculating..."}
            </span>
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
        <Button
          onClick={onFinish}
          variant="contained"
          sx={{
            backgroundColor: "#1565c0",
            color: "white",
            fontWeight: "bold",
            paddingX: 4,
            borderRadius: 3,
            "&:hover": { backgroundColor: "#0d47a1" },
          }}
        >
          Back to Home
        </Button>
      </DialogActions>
    </Dialog>
  );
}
