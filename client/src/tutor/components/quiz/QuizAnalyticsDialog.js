import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { FaUsers, FaClock, FaChartBar } from "react-icons/fa";

const QuizAnalyticsDialog = ({ quiz, onClose, id }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!quiz) return;

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/course/quiz-analytics/${id}/${quiz._id}`,
          { withCredentials: true }
        );
        setAnalytics(response.data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [quiz]);

  return (
    <Dialog
      open={!!quiz}
      onClose={onClose}
      maxWidth={false} // Disable predefined maxWidth
      PaperProps={{
        style: { width: "70%", maxWidth: "600px", padding: "30px" }, // Adjust as needed
      }}
    >
      <h1 className="font-extrabold text-2xl text-center tracking-wider py-6 uppercase text-gray-800 drop-shadow-lg">
        {quiz?.title} - Analytics
      </h1>

      <DialogContent className="p-5 space-y-5 bg-gray-50">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <CircularProgress />
          </div>
        ) : analytics ? (
          <div className="space-y-6">
            {/* Quiz Info */}
            <div className="bg-white shadow-lg p-6 rounded-xl border border-gray-200">
              {/* Quiz Description */}
              <p className="text-gray-800 text-base flex items-center">
                <FaClock className="text-blue-600 mr-3 text-lg" />
                <strong className="mr-1">Quiz Description:</strong>
                <span className="text-gray-600 italic">
                  {quiz.description || "N/A"}
                </span>
              </p>

              {/* Total Users Attempted */}
              <p className="text-gray-800 text-base flex items-center mt-3">
                <FaUsers className="text-green-600 mr-3 text-lg" />
                <strong className="mr-1">Total Users Attempted:</strong>
                <span className="text-gray-700 font-semibold">
                  {analytics.totalParticipants}
                </span>
              </p>
            </div>

            {/* Questions List */}
            <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-700 mb-4">
                Questions:
              </h3>
              <ul className="space-y-4">
                {analytics.questions.map((q, i) => (
                  <li
                    key={i}
                    className="bg-gray-100 p-4 rounded-md shadow-sm relative border-l-4 border-blue-500"
                  >
                    {/* Question Number on Top Left */}
                    <span className="absolute -top-2 -left-2 bg-blue-500 text-white font-bold px-3 py-1 rounded-full text-sm">
                      {i + 1}
                    </span>

                    {/* Question Title */}
                    <p className="text-lg font-semibold text-gray-800 mt-2">
                      {q.title}
                    </p>

                    {/* Options */}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {q.options.map((option, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            option.value === q.correctAnswer
                              ? "bg-blue-200 text-blue-800 border border-blue-400"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {option.value}
                        </span>
                      ))}
                    </div>

                    {/* Correct Answer */}
                    <p className="mt-2 text-sm text-gray-600">
                      <b>Correct Answer:</b>{" "}
                      <span className="px-3 py-1 rounded-full text-sm font-bold text-green-800 bg-green-200 border border-green-400 inline-block">
                        {q.answer}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            {/* Participants Table */}
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h3 className="text-lg font-bold text-gray-700 my-4">
                <FaChartBar className="inline text-purple-600 mr-2" />
                Participants & Scores:
              </h3>

              {analytics.participants.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-200 p-2 text-left">
                          Name
                        </th>
                        <th className="border border-gray-200 p-2 text-left">
                          Score
                        </th>
                        <th className="border border-gray-200 p-2 text-left">
                          Attempted At
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.participants.map((user, i) => (
                        <tr key={i} className="odd:bg-gray-50">
                          <td className="border border-gray-200 p-2">
                            {user.name || "Unknown"}
                          </td>
                          <td className="border border-gray-200 p-2 font-semibold text-blue-600">
                            {user.score}
                          </td>
                          <td className="border border-gray-200 p-2 text-gray-500">
                            {new Date(user.attemptedAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">
                  No users have attempted this quiz yet.
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No analytics available.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuizAnalyticsDialog;
