import React, { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import PDFCard from "../../shared-ui/PDFCard";
import VideoPlayer from "../../shared-ui/VideoPlayer";
import axios from "axios";
import UploadPDF from "../components/UploadPDF";
import CommentSection from "../../shared-ui/CommentSection";
import toast from "react-hot-toast";
import CommentLoader from "../../shared-ui/CommentLoader";

export default function ChapterPage() {
  const { chapter } = useParams();
  const { id, course, fetchCourseData } = useOutletContext();
  const [unit, setUnit] = useState({});
  const [pdfFile, setPdfFile] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (course && course.units && chapter) {
      const unitDetails = course.units.find(
        (unit, index) => index + 1 === parseInt(chapter)
      );
      if (unitDetails) {
        setUnit(unitDetails);
      }
    }
  }, [course, chapter]);

  const handlePdfDownload = (url, index) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `Resource_${index + 1}.pdf`;
    link.click();
  };

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
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

  const handleUpload = async () => {
    if (!pdfFile) {
      alert("Please select a file to upload");
      return;
    }

    try {
      setLoading(true);
      const pdf_url = await uploadPdf();
      console.log(pdf_url);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/course/add-pdf`,
        {
          unit_id: unit._id,
          pdf_url,
          id,
        },
        { withCredentials: true }
      );

      console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setPdfFile(null);
      setLoading(false);
      navigate(`/tutorcourse/${id}`);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!comment) {
      alert("Please enter a comment before submitting");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/course/add-comment`,
        {
          comment,
          course_id: id,
          unit_id: unit._id,
        },
        { withCredentials: true }
      );

      toast.success(data.message);
      setComment("");
      fetchCourseData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentDelete = async (e, comment_id) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/course/delete-comment`,
        {
          course_id: id,
          unit_id: unit._id,
          comment_id,
        },
        { withCredentials: true }
      );
      toast.success(data.message);
      setComment("");
      fetchCourseData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen mx-auto">
        <CommentLoader />
      </div>
    );

  return (
    <>
      {course && unit && (
        <div className="mx-5 w-full">
          <h1 className="font-bold text-2xl tracking-wider py-5 text-center">
            {unit.name}
          </h1>

          {/* VIDEO-PLAYER */}
          <div className="my-10">
            <div className="w-full">
              {unit.video_url && <VideoPlayer src={unit.video_url} />}
            </div>
          </div>

          <div className="h-[2rem]"></div>

          {/* DISPLAY ALL PDFS */}
          {unit.pdf_urls && unit.pdf_urls.length > 0 && (
            <PDFCard unit={unit} handlePdfDownload={handlePdfDownload} />
          )}

          <div className="h-[2rem]"></div>

          <div className="my-5">
            <UploadPDF
              loading={loading}
              handleFileChange={handleFileChange}
              handleUpload={handleUpload}
            />
          </div>

          {/* COMMENTS-SECTION */}
          <div className="h-[3rem]"></div>
          <div className="my-5">
            <CommentSection
              unit={unit}
              comment={comment}
              setComment={setComment}
              handleCommentSubmit={handleCommentSubmit}
              handleCommentDelete={handleCommentDelete}
            />
          </div>
          <div className="h-[3rem]"></div>
        </div>
      )}
    </>
  );
}
