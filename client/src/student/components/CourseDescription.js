import React from "react";
import TextField from "@mui/material/TextField";

export default function CourseDescription({ value }) {
  return (
    <div>
      <TextField
        fullWidth
        multiline
        rows={9}
        variant="outlined"
        value={value}
      />
    </div>
  );
}
