import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import WatchLoader from "../../shared-ui/WatchLoader";

export default function UploadNewChapter() {
  const { id, fetchCourseData } = useOutletContext();
  const navigate = useNavigate();
  const [chapterName, setChapterName] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChapterNameChange = (e) => {
    setChapterName(e.target.value);
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handlePdfFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const uploadVideo = async () => {
    const data = new FormData();
    data.append("file", videoFile);
    data.append("upload_preset", "videos_preset");

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

  const uploadPdf = async () => {
    const data = new FormData();
    data.append("file", pdfFile);
    data.append("upload_preset", "pdf_preset");

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

  const handleSubmit = async () => {
    if (!chapterName) {
      alert("Please provide chapter name");
      return;
    }
    if (!videoFile) {
      alert("Please provide video file");
      return;
    }

    if (!pdfFile) {
      alert("Please provide pdf file");
      return;
    }

    try {
      setLoading(true);
      const video_url = await uploadVideo();
      const pdf_url = await uploadPdf();

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/course/chapter`,
        {
          chapterName,
          video_url,
          pdf_url,
          id,
        },
        { withCredentials: true }
      );

      toast.success(response.message);
      await fetchCourseData();
    } catch (err) {
      console.log(err);
    } finally {
      setChapterName("");
      setVideoFile(null);
      setPdfFile(null);
      setLoading(false);
      // navigate(`/tutorcourse/${id}`);
    }
  };

  if (loading)
    return (
      <div className="mx-auto">
        <h1 className="text-2xl p-5 text-center font-bold">Uploading...</h1>
        <WatchLoader />
      </div>
    );

  return (
    <div className="mx-5 px-5 mt-5 overflow-y-auto w-full h-screen">
      <h3 className="font-semibold text-xl my-4 text-center">
        Upload New Chapter
      </h3>
      <form onSubmit={handleSubmit} className="my-5 mx-5">
        <div>
          <TextField
            id="chapterName"
            label="Chapter Name"
            variant="outlined"
            value={chapterName}
            fullWidth
            onChange={handleChapterNameChange}
            className="mb-4"
          />
        </div>
        <div className="flex justify-between my-5">
          <p className="font-semibold mr-5">Upload Video</p>
          <input
            type="file"
            id="videoFile"
            accept="video/*"
            onChange={handleVideoFileChange}
          />
        </div>

        <div className="flex justify-between my-5">
          <p className="font-semibold mr-5">Upload Pdf</p>
          <input
            type="file"
            accept=".pdf"
            id="pdfFile"
            onChange={handlePdfFileChange}
          />
        </div>

        <div className="my-2 py-2">
          <Button type="submit" variant="contained" color="primary">
            Upload
          </Button>
        </div>
      </form>
    </div>
  );
}
