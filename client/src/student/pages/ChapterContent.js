import React, { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";

import VideoPlayer from "../../shared-ui/VideoPlayer";
import PDFCard from "../../shared-ui/PDFCard";

export default function ChapterContent() {
  const { chapter } = useParams();
  const { id, course } = useOutletContext();
  const [unit, setUnit] = useState({});
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
