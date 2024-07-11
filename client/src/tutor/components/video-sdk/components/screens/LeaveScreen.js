import React, { useEffect } from "react";

export function LeaveScreen({ setIsMeetingLeft, setMicOn, setWebcamOn }) {
  useEffect(() => {
    const stopMediaTracks = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });

        stream.getTracks().forEach((track) => {
          track.stop();
        });
      } catch (error) {
        console.error("Error stopping media tracks:", error);
      }
    };

    stopMediaTracks();

    return () => {
      setMicOn(false);
      setWebcamOn(false);
    };
  }, [setMicOn, setWebcamOn]);

  return (
    <div className="h-screen flex flex-col flex-1 items-center justify-center">
      <h1 className="text-gray-900 text-4xl">You left the meeting!</h1>
      <div className="mt-12">
        <button
          className="w-full bg-purple-500 text-white font-bold px-16 py-3 rounded-lg text-sm"
          onClick={() => {
            setIsMeetingLeft(false);
          }}
        >
          Rejoin the Meeting
        </button>
      </div>
    </div>
  );
}
