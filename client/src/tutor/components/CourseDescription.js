import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function CourseDescription({ value, id }) {
  const [description, setDescription] = useState(value);
  const [loading, setLoading] = useState(false);

  const handleDiscriptionUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8000/api/v1/course/description`,
        {
          description,
          id,
        },
        { withCredentials: true }
      );

      console.log(response.data);
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  if (loading)
    return (
      <div className="items-center p-5 h-[5rem] text-sm font-semibold">
        Loading...
      </div>
    );

  return (
    <>
      <div>
        <TextField
          fullWidth
          multiline
          maxRows={15}
          variant="outlined"
          value={description}
          onChange={handleChange}
          placeholder="Your course description..."
        />
        <div className="my-2">
          <Button
            variant="contained"
            color="primary"
            onClick={handleDiscriptionUpdate}
            className="hover:bg-blue-600 transition duration-300"
          >
            Update Course Description
          </Button>
        </div>
      </div>
    </>
  );
}
