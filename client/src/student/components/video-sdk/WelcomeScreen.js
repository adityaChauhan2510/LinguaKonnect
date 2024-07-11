// import { createNewRoom, getToken } from "../video-sdk/api";
// import { useState } from "react";

// const WelcomeScreen = ({
//   participantName,
//   setToken,
//   setMeetingId,
//   onClickStartMeeting,
// }) => {
//   const [loading, setLoading] = useState(false);

//   const createClick = async () => {
//     try {
//       setLoading(true);
//       const token = await getToken();
//       const meetingId = await createNewRoom();
//       if (meetingId) {
//         setMeetingId(meetingId);
//         setToken(token);
//         onClickStartMeeting();
//       }
//     } catch (err) {
//       console.log("Error creating new room", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mx-5 px-5 mt-5 overflow-y-auto w-full">
//       <h3 className="font-semibold text-2xl my-4 text-center">
//         Start Live Class
//         <p className="text-sm my-5 text-gray-400">
//           To start a live class, first click on create new meeting and then send
//           the link to all students via mail.{" "}
//         </p>
//       </h3>

//       <div className="h-[3rem]"></div>
//       {loading ? (
//         <div className="font-semibold text-md items-center my-3">
//           <p className="text-gray-500 text-center">Creating Meet....🎥🎥</p>
//         </div>
//       ) : (
//         <div className="my-5 flex flex-col items-center space-y-5">
//           <input
//             type="text"
//             value={participantName}
//             readOnly
//             className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Your Name"
//           />
//           <div className="w-full max-w-md flex justify-center">
//             <button
//               onClick={createClick}
//               className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Create New Meeting
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WelcomeScreen;
