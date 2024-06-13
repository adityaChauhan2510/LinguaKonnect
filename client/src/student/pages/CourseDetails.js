import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button, CardMedia, Modal, TextField, Box } from "@mui/material";
import Review from "../components/Review";
import Notes from "../components/Notes";
import axios from "axios";
import io from "socket.io-client";
import toast, { Toaster } from "react-hot-toast";
import ReviewForm from "../components/CourseReview";
import StarRating from "../components/StarRating";
const URI = "https://linguakonnect.onrender.com";

const socket = io("http://localhost:5000", {
  autoConnect: false,
});

export default function CourseDetails() {
  const [courseDetails, setCourseDetails] = useState({});
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [chat, setChat] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [openDoubtModal, setOpenDoubtModal] = useState(false);
  const [doubt, setDoubt] = useState("");
  const { id } = useParams();

  const handleOpenDoubtModal = () => setOpenDoubtModal(true);
  const handleCloseDoubtModal = () => setOpenDoubtModal(false);

  const handleDoubtSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/v1/course/ask-doubt",
        { course_id: id, doubt },
        { withCredentials: true }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error submitting doubt:", error.message);
      toast.error(error.response?.data?.message || "Error submitting doubt");
    } finally {
      setLoading(false);
      setDoubt(""); // Clear the input field after submission
      setOpenDoubtModal(false); // Close the modal after submission
    }
  };

  const handleRating = async (index) => {
    setRating(() => index);
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/v1/course/rate",
        { course_id: id, rating: index },
        { withCredentials: true }
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error in course rating:", error.message);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCoursePurchase = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/course/enroll",
        { course_id: id },
        { withCredentials: true }
      );

      //console.log(response.data);
      setIsEnrolled(true);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error enrolling in course:", error.message);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (review.length === 0) {
      alert("Can't submit an empty review..");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/v1/course/review",
        { course_id: id, review },
        { withCredentials: true }
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error enrolling in course:", error.message);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
      setReview(""); // Clear the input field after submission
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [
          {
            data: { result: course },
          },
          {
            data: { enrolledCourses: enrolledCourses },
          },
          {
            data: { user: user },
          },
        ] = await Promise.all([
          axios.get(`http://localhost:8000/api/v1/course/${id}`, {
            withCredentials: true,
          }),
          axios.get(`http://localhost:8000/api/v1/user/getcourses`, {
            withCredentials: true,
          }),
          axios.get(`http://localhost:8000/api/v1/user/me`, {
            withCredentials: true,
          }),
        ]);

        //console.log(course);
        setCourseDetails(course);

        //console.log(enrolledCourses);
        const Ids = enrolledCourses.map((course) => course.courseId._id);

        //console.log(Ids.includes(id));
        setIsEnrolled(() => Ids.includes(id));

        //console.log(user.name);
        //to show name in chat
        setUserName(() => user.name);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setIsEnrolled, setCourseDetails]);

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat((prevChat) => [...prevChat, payload]);
    });

    socket.on("error", (error) => {
      toast.error(error.message);
    });

    return () => {
      socket.off("chat");
      socket.off("error");
    };
  }, [chat, setChat]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    socket.connect();
    socket.emit("chat", { message, userName, roomId: id });
    setMessage("");
  };

  if (loading) return <div className="mt-5 mx-10">Loading...</div>;

  return (
    <>
      <Navbar />

      {isEnrolled ? (
        <>
          <div className="flex justify-between">
            <h1 className="mt-5 mx-10 text-3xl font-bold">
              {courseDetails.name}
            </h1>
            <div className="flex">
              <h2 className="my-5 mx-2 text-lg font-bold">Rate Us</h2>
              <span className="my-2 mr-10 px-2 text-md font-bold">
                <StarRating
                  rating={rating}
                  hover={hover}
                  handleRating={handleRating}
                  setHover={setHover}
                  setRating={setRating}
                />
              </span>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="mx-10 mt-10 h-[20rem] w-[30rem] bg-gray-200">
              video-link-to-class
              {/* <StudentVideo /> */}
            </div>
            <div className="mx-10 px-10 mt-10">
              <Notes />
            </div>
          </div>

          <div className="mx-10 my-10">
            <h2 className="text-2xl">Live Chats</h2>

            {/* input field for showing chats during class */}
            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-row gap-4">
                <input
                  type="text"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border border-gray-300 rounded px-2 my-3"
                />
                <div className="px-2 my-3">
                  <Button variant="contained" color="primary" type="submit">
                    Send Message
                  </Button>
                </div>
              </div>
            </form>

            {chat.map((payload, index) => (
              <p key={index}>
                {payload.message} :{" "}
                <span className="font-bold px-5">{payload.userName}</span>
              </p>
            ))}

            <div className="my-10">
              <ReviewForm
                review={review}
                setReview={setReview}
                handleSubmitReview={handleSubmitReview}
              />
            </div>
          </div>
        </>
      ) : (
        courseDetails && (
          <>
            <div className="flex gap-4">
              <div className="mx-10 mt-10 h-[20rem] w-[30rem] bg-gray-200">
                <CardMedia
                  component="img"
                  image={courseDetails.image || "images/bg2.jpg"}
                  alt="image"
                />
              </div>

              <div className="mx-10 mt-8 grid grid-cols-2 gap-6">
                <p className="my-2 py-2 px-2">
                  <span className="font-semibold px-2">TutorName : </span>
                  {courseDetails.tutor_id ? courseDetails.tutor_id.name : ""}
                </p>
                <p className="my-2 py-2 px-2">
                  <span className="font-semibold px-2">
                    {" "}
                    Enrolled-students :{" "}
                  </span>
                  {courseDetails.enrolled_students}
                </p>
                <p className="my-2 py-2 px-2">
                  <span className="font-semibold px-2">Ratings :</span>{" "}
                  {courseDetails.rating}
                </p>
                <p className="my-2 py-2 px-2">
                  <span className="font-semibold px-2"> Starting on : </span>

                  {courseDetails.createdAt
                    ? new Date(courseDetails.createdAt).toLocaleDateString(
                        "en-GB"
                      )
                    : ""}
                </p>
                <p className="my-2 py-2 px-2">
                  <span className="font-semibold px-2">Price : </span>
                  <span className="font-bold">{"₹ "}</span>
                  {courseDetails.pricing}
                </p>
                {courseDetails.time_durations?.map((duration, index) => (
                  <React.Fragment key={index}>
                    <p className="my-2 py-2 px-2">
                      <span className="font-semibold px-2">Duration: </span>
                      {duration.duration}
                    </p>
                    <p className="my-2 py-2 px-2">
                      <span className="font-semibold px-2">Start Time: </span>
                      {duration.start_time}
                    </p>
                    <p className="my-2 py-2 px-2">
                      <span className="font-semibold px-2">End Time: </span>
                      {duration.end_time}
                    </p>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="flex justify-center my-10">
              <Button
                variant="contained"
                color="success"
                onClick={handleCoursePurchase}
              >
                Purchase
              </Button>
            </div>

            {courseDetails &&
              courseDetails.reviews &&
              courseDetails.reviews.length > 0 && (
                <div className="mt-10 mx-10">
                  <h1 className="text-3xl mt-20 mb-10">What Others Say!!</h1>
                  <Review reviews={courseDetails.reviews} />
                </div>
              )}
          </>
        )
      )}

      <div className="mx-10 mt-1 mb-10 flex justify-end">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenDoubtModal}
          className="grow-shrink-button"
        >
          Ask Your Doubt 💡✅✅
        </Button>

        <Modal
          open={openDoubtModal}
          onClose={handleCloseDoubtModal}
          aria-labelledby="ask-doubt-modal-title"
          aria-describedby="ask-doubt-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <form onSubmit={handleDoubtSubmit}>
              <TextField
                label="Your Doubt"
                multiline
                rows={4}
                value={doubt}
                onChange={(e) => setDoubt(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <div className="my-5">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="mt-2"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>

      <Toaster />
    </>
  );
}
