import React from "react";

export default function VideoPlayer({ src }) {
  return (
    <div className="flex items-center justify-center">
      <video
        key={src}
        controls
        className="border-4 border-gray-300 rounded-lg shadow-lg"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
