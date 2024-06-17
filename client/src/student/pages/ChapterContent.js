import React, { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";

import VideoPlayer from "../../shared-ui/VideoPlayer";
import PDFCard from "../../shared-ui/PDFCard";
import CommentSection from "../../shared-ui/CommentSection";

export default function ChapterContent() {
  const { chapter } = useParams();
  const { id, course } = useOutletContext();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState({});

  console.log(unit);

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

  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment) {
      alert("Please enter a comment before submitting");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8000/api/v1/course/add-comment`,
        {
          comment,
          course_id: id,
          unit_id: unit._id,
        },
        { withCredentials: true }
      );

      console.log(response.message);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePdfDownload = (url, index) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `Resource_${index + 1}.pdf`;
    link.click();
  };

  return (
    <>
      {course && unit && (
        <>
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

            {/* COMMENTS-SECTION */}
            <div className="h-[3rem]"></div>
            <div className="my-5">
              <CommentSection unit={unit} />
            </div>
            <div className="h-[3rem]"></div>
          </div>
        </>
      )}
    </>
  );
}
