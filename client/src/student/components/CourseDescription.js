import React from "react";
import TextField from "@mui/material/TextField";

export default function CourseDescription({ value }) {
  return (
    <div>
      <h1 className="font-bold text-2xl text-center tracking-wider py-6 uppercase text-gray-800 drop-shadow-lg">
        Course Description
      </h1>

      {value ? (
        <TextField
          label="Course Description..."
          fullWidth
          multiline
          rows={9}
          variant="outlined"
          value={value}
        />
      ) : (
        <TextField
          label="Course Description..."
          fullWidth
          multiline
          rows={9}
          variant="outlined"
        ></TextField>
      )}
    </div>
  );
}
