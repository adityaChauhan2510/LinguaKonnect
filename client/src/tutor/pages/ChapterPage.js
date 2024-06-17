import React, { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import PDFCard from "../../shared-ui/PDFCard";
import VideoPlayer from "../../shared-ui/VideoPlayer";
import axios from "axios";
import UploadPDF from "../components/UploadPDF";

export default function ChapterPage() {
  const { chapter } = useParams();
  const { id, course } = useOutletContext();
  const [unit, setUnit] = useState({});
  const [pdfFile, setPdfFile] = useState(null);
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

          {/* DISPLAY ALL PDFS */}
          {unit.pdf_urls && unit.pdf_urls.length > 0 && (
            <PDFCard unit={unit} handlePdfDownload={handlePdfDownload} />
          )}

          <div className="my-5">
            <UploadPDF
              loading={loading}
              handleFileChange={handleFileChange}
              handleUpload={handleUpload}
            />
          </div>

          {/* COMMENTS-SECTION */}
          <div className="h-[5rem]"></div>
          <div className="my-5">
            <h1 className="text-xl font-semibold tracking-wider">Comments</h1>
          </div>
        </div>
      )}
    </>
  );
}
