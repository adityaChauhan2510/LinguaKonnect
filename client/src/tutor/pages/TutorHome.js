import React, { useState, useEffect } from "react";
import Navbar from "../components/TNavbar.js";
import TutorCard from "../components/TutorCard.js";
import axios from "axios";
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
import toast, { Toaster } from "react-hot-toast";

function TutorHome() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    courseName: "",
    language: "",
    duration: [],
    price: "",
    timings: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/tutor/tutorcourses`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setData(response.data.takingCourses);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { courseName, language, price, duration, timings } = formData;

    const requestData = {
      name: courseName,
      language: language,
      pricing: parseInt(price),
      slot_time_in_min: duration,
      time_durations: timings,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/course/add",
        requestData,
        { withCredentials: true }
      );

      const newCourseId = response.data.result._id;

      setData([...data, { id: newCourseId, ...requestData }]);

      setFormData({
        courseName: "",
        language: "",
        duration: [],
        price: "",
        timings: [],
      });

      setOpenForm(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
        start_time: "",
        end_time: "",
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
      <div className="my-10 mx-10">
        <h1 className="text-3xl font-bold mx-5 px-5">My Courses</h1>
        <div className="mt-10">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
            {loading ? (
              <p className="mt-10 mx-10">Loading...</p>
            ) : (
              data.map((course, index) => (
                <TutorCard key={index} course={course} />
              ))
            )}
          </section>

          <div className="mx-5 px-5">
            <Button
              variant="contained"
              color="success"
              onClick={() => setOpenForm(true)}
            >
              Click to add courses
            </Button>
          </div>

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
                      value={timing.start_time}
                      onChange={handleTimeChange(index, "start_time")}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label={`End Time ${index + 1}`}
                      value={timing.end_time}
                      onChange={handleTimeChange(index, "end_time")}
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
      <Toaster />
    </div>
  );
}

export default TutorHome;
