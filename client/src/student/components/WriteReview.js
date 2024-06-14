import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

export default function WriteReview({ review, setReview, handleSubmitReview }) {
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  return (
    <form onSubmit={handleSubmitReview}>
      <TextField
        label="Leave Feedback"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={review}
        onChange={handleReviewChange}
      />
      <div className="my-5">
        <Button type="submit" variant="contained" color="primary" className="">
          Submit Feedback
        </Button>
      </div>
    </form>
  );
}
