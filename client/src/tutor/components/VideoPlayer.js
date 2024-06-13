import React from "react";

export default function VideoPlayer({ src }) {
  return (
    <div>
      <video key={src} controls>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
