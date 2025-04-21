import React, { useEffect, useState } from "react";
import axios from "axios";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { MeetingAppProvider } from "../../../components/video-sdk/context/MeetingAppContextDef";
import { MeetingContainer } from "../../../components/video-sdk/meeting/MeetingContainer";
import { LeaveScreen } from "../../../components/video-sdk/components/screens/LeaveScreen";
import { JoiningScreen } from "../../../components/video-sdk/components/screens/JoiningScreen";

export default function LiveClass() {
  const [token, setToken] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [micOn, setMicOn] = useState(false);
  const [webcamOn, setWebcamOn] = useState(false);
  const [customAudioStream, setCustomAudioStream] = useState(null);
  const [customVideoStream, setCustomVideoStream] = useState(null);
  const [isMeetingStarted, setMeetingStarted] = useState(false);
  const [isMeetingLeft, setIsMeetingLeft] = useState(false);

  const getUserData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/me`,
      {
        withCredentials: true,
      }
    );
    setParticipantName(res.data?.user.name);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const isMobile = window.matchMedia(
    "only screen and (max-width: 768px)"
  ).matches;

  useEffect(() => {
    if (isMobile) {
      window.onbeforeunload = () => {
        return "Are you sure you want to exit?";
      };
    }
  }, [isMobile]);

  return (
    <>
      <MeetingAppProvider>
        {isMeetingStarted ? (
          <MeetingProvider
            config={{
              meetingId,
              micEnabled: micOn,
              webcamEnabled: webcamOn,
              name: participantName ? participantName : "TestUser",
              multiStream: true,
              customCameraVideoTrack: customVideoStream,
              customMicrophoneAudioTrack: customAudioStream,
            }}
            token={token}
            reinitialiseMeetingOnConfigChange={true}
            joinWithoutUserInteraction={true}
          >
            <MeetingContainer
              onMeetingLeave={() => {
                setToken("");
                setMeetingId("");
                setParticipantName("");
                setWebcamOn(false);
                setMicOn(false);
                setMeetingStarted(false);
              }}
              setIsMeetingLeft={setIsMeetingLeft}
            />
          </MeetingProvider>
        ) : isMeetingLeft ? (
          <LeaveScreen
            setIsMeetingLeft={setIsMeetingLeft}
            setWebcamOn={setWebcamOn}
            setMicOn={setMicOn}
          />
        ) : (
          <JoiningScreen
            participantName={participantName}
            setParticipantName={setParticipantName}
            setMeetingId={setMeetingId}
            setToken={setToken}
            micOn={micOn}
            setMicOn={setMicOn}
            webcamOn={webcamOn}
            setWebcamOn={setWebcamOn}
            customAudioStream={customAudioStream}
            setCustomAudioStream={setCustomAudioStream}
            customVideoStream={customVideoStream}
            setCustomVideoStream={setCustomVideoStream}
            onClickStartMeeting={() => {
              setMeetingStarted(true);
            }}
            startMeeting={isMeetingStarted}
            setIsMeetingLeft={setIsMeetingLeft}
          />
        )}
      </MeetingAppProvider>
    </>
  );
}
