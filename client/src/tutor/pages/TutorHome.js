import React, { useContext, useState } from "react";
import Navbar from "../components/TNavbar.js";
import TutorCard from "../components/TutorCard.js";
import axios from "axios";
import VideoChat from "../components/VideoChat.js";
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
import { Context } from "../../index.js";

/*
{
    "name": "Advanced Hindi",
    "language": "Hindi",
    "tutor_id": "65ecac98d8beb7095a7f3c60", 
    "pricing": 2021,
    "slot_time_in_min": [45, 60, 90],
    "time_durations": [{"start_time": "12am", "end_time": "12:30am"}]
}

*/

function TutorHome() {
  const { tutor, isAuthenticated } = useContext(Context);
  const [data, setData] = useState([]);
  const tutor_id = tutor._id;
  console.log(tutor);

  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    courseName: "",
    language: "",
    duration: [],
    price: "",
    timings: [],
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const { courseName, language, price, duration, timings } = formData;

    const requestData = {
      name: courseName,
      language: language,
      tutor_id: tutor_id, // Assuming tutor_id is already defined
      pricing: parseInt(price), // Assuming price is a string, convert it to a number
      slot_time_in_min: duration, // Assuming duration is an array of numbers
      time_durations: timings, // Assuming timings is an array of objects containing start_time and end_time
    };

    console.log(requestData);
    // axios
    //   .post("http://example.com/api/submit", formData)
    //   .then((response) => {
    //     const newCourseId = response.data.id;

    //     setData([...data, { id: newCourseId, ...formData }]);

    //     setFormData({
    //       courseName: "",
    //       language: "",
    //       duration: [],
    //       price: "",
    //       timings: [],
    //     });

    //     setOpenForm(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error submitting form:", error);
    //   });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDurationChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      duration: value,
      timings: Array.from({ length: value.length }, () => ({
        startTime: "",
        endTime: "",
      })),
    });
  };

  const handleTimeChange = (index, type) => (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      timings: prevFormData.timings.map((timing, i) =>
        i === index ? { ...timing, [type]: value } : timing
      ),
    }));
  };

  return (
    <div>
      <Navbar />
      {/* <VideoChat/> */}
      <div className="my-10 mx-10">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <div className="mt-10">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
            {data.length > 0 ? (
              data.map((course, index) => (
                <TutorCard key={index} course={course} />
              ))
            ) : (
              <h1 className="text-sm font-bold">Click to add courses</h1>
            )}
          </section>

          <Button
            variant="contained"
            color="success"
            onClick={() => setOpenForm(true)}
          >
            Click to add courses
          </Button>

          <Dialog open={openForm} onClose={() => setOpenForm(false)}>
            <DialogTitle>Add Course</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Course Name"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Duration</InputLabel>
                  <Select
                    multiple
                    value={formData.duration}
                    onChange={handleDurationChange}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    <MenuItem value={45}>45 mins</MenuItem>
                    <MenuItem value={60}>60 mins</MenuItem>
                    <MenuItem value={90}>90 mins</MenuItem>
                  </Select>
                </FormControl>
                {formData.timings.map((timing, index) => (
                  <div key={index}>
                    <TextField
                      label={`Start Time ${index + 1}`}
                      value={timing.startTime}
                      onChange={handleTimeChange(index, "startTime")}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label={`End Time ${index + 1}`}
                      value={timing.endTime}
                      onChange={handleTimeChange(index, "endTime")}
                      fullWidth
                      margin="normal"
                    />
                  </div>
                ))}
                <TextField
                  label="Price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default TutorHome;
