import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

export default function ReviewForm({ review, setReview, handleSubmitReview }) {
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  return (
    <form onSubmit={handleSubmitReview}>
      <TextField
        label="Write your review"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={review}
        onChange={handleReviewChange}
      />
      <div className="mt-3">
        <Button type="submit" variant="contained" color="primary">
          Submit Review
        </Button>
      </div>
    </form>
  );
}
