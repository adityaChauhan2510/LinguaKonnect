import React, { useState, useEffect } from "react";
import Navbar from "../components/TNavbar.js";
import TutorCard from "../components/TutorCard.js";
import axios from "axios";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import Form from "../components/Form.js";
import Loading from "../components/Loading.js";
import { Footer } from "../../shared-ui/Footer.js";

// const URI = "https://linguakonnect.onrender.com"

function TutorHome() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [imageFile, setImageFile] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    courseName: "",
    language: "",
    duration: "",
    start_time: "",
    end_time: "",
    price: "",
  });

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "images_preset");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/auto/upload`,
        data
      );

      return response.data.secure_url;
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { courseName, language, price, duration, start_time, end_time } =
      formData;

    const requestData = new FormData();
    requestData.append("name", courseName);
    requestData.append("language", language);
    requestData.append("pricing", parseInt(price));
    requestData.append("duration", duration);
    requestData.append("start_time", start_time);
    requestData.append("end_time", end_time);

    try {
      const image_url = await uploadImage();
      requestData.append("image", image_url);

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
      });

      setImageFile(null);
      setOpenForm(false);
      setFormSubmitted(!formSubmitted);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
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
  }, [formSubmitted]);

  if (loading) return <Loading />;

  return (
    <>
      {data && (
        <div className="">
          <Navbar />
          <div className="my-10">
            <h1 className="text-4xl text-neutral-800 font-extrabold text-center mx-5 px-5">
              My Courses
            </h1>
            <div className="my-2">
              <div className="grid px-10 sm:px-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-2 lg:gap-10 my-10">
                {data.map((course, index) => (
                  <TutorCard key={index} course={course} />
                ))}
              </div>

              {/* EMPTY-DIV */}
              <div className="h-[5rem]"></div>
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
                imageFile={imageFile}
                setImageFile={setImageFile}
                setFormData={setFormData}
              />

              <div className="h-[1rem]"></div>
            </div>
          </div>

          <Footer />
        </div>
      )}
    </>
  );
}

export default TutorHome;
