import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export default function Form({
  openForm,
  setOpenForm,
  handleFormSubmit,
  formData,
  setFormData,
  imageFile,
  setImageFile,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  return (
    <Dialog open={openForm} onClose={() => setOpenForm(false)}>
      <DialogTitle>Add Course</DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <TextField
            label="Course Name"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Duration</InputLabel>
            <Select
              name="duration"
              label="Duration"
              value={formData.duration}
              onChange={handleChange}
              renderValue={(selected) =>
                Array.isArray(selected) ? selected : [selected]
              }
            >
              <MenuItem value={"45 mins"}>45 mins</MenuItem>
              <MenuItem value={"60 mins"}>60 mins</MenuItem>
              <MenuItem value={"90 mins"}>90 mins</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Start Time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="End Time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Course Image"
            type="file"
            name="courseImage"
            onChange={handleImageChange}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
            inputProps={{ accept: "image/*" }}
          />
          <div className="mt-3">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
