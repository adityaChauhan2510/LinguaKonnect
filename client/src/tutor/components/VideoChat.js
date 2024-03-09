import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

/*
router.post('/send-video-chat-link/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { videoChatId } = req.body;

    // Logic to find all students enrolled in the course with courseId
    // This could be querying your database or any other method
    const students = await Student.find({ courseId });

    // Send the video chat link to each student
    students.forEach(async (student) => {
      // Assuming you have a method in your Student model to send the video chat link
      await student.sendVideoChatLink(videoChatId);
    });

    res.status(200).json({ message: 'Video chat link sent to all students' });
  } catch (error) {
    console.error('Error sending video chat link:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

*/
function VideoChat(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
  const roomID = getUrlParams().get("roomID") || VideoChat(5);
  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 947634788;
    const serverSecret = "57d0df981af34a35fde85f63da4aa6d3";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      VideoChat(5),
      VideoChat(5)
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "50vw", height: "50vh" }}
    ></div>
  );
}
