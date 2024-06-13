import React, { useState, useEffect } from "react";
import Navbar from "../components/TNavbar.js";
import TutorCard from "../components/TutorCard.js";
import axios from "axios";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import Form from "../components/Form.js";
// const URI = "https://linguakonnect.onrender.com"

function TutorHome() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    courseName: "",
    language: "",
    duration: "",
    start_time: "",
    end_time: "",
    price: "",
    image: null,
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const {
      courseName,
      language,
      price,
      duration,
      start_time,
      end_time,
      image,
    } = formData;

    const requestData = new FormData();
    requestData.append("name", courseName);
    requestData.append("language", language);
    requestData.append("pricing", parseInt(price));
    requestData.append("duration", duration);
    requestData.append("start_time", start_time);
    requestData.append("end_time", end_time);
    requestData.append("image", image);

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
        duration: "",
        start_time: "",
        end_time: "",
        price: "",
        image: null,
      });

      setOpenForm(false);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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
        setData(response.data.takingCourses);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <div className="mt-10 mx-10 text-xl font-semibold">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="mt-10">
        <h1 className="text-3xl font-bold mx-5 px-5">My Courses</h1>
        <div className="my-2">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
            {data.map((course, index) => (
              <TutorCard key={index} course={course} />
            ))}
          </section>

          <div className="px-5 mx-5">
            <Button
              variant="contained"
              color="success"
              onClick={() => setOpenForm(true)}
            >
              Click to add courses
            </Button>
          </div>

          <Form
            openForm={openForm}
            setOpenForm={setOpenForm}
            handleFormSubmit={handleFormSubmit}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>
    </>
  );
}

export default TutorHome;
