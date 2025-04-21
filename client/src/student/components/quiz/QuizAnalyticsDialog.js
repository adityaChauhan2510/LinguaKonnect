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
        console.error("Error fetching student analytics:", err);
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
      <DialogTitle className="text-center text-xl font-bold text-gray-800">
        {quiz?.title} - Analytics
      </DialogTitle>

      <DialogContent className="p-5 space-y-5 bg-gray-50">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <CircularProgress />
          </div>
        ) : analytics ? (
          <div className="space-y-6">
            {/* Quiz Info */}
            <div className="bg-white shadow-md p-4 rounded-lg">
              <p className="text-gray-700 text-sm">
                <FaClock className="inline text-blue-600 mr-2" />
                <strong>Quiz Description:</strong> {quiz.description || "N/A"}
              </p>
              <p className="text-gray-700 text-sm mt-2">
                <FaUsers className="inline text-green-600 mr-2" />
                <strong>Total Users Attempted:</strong>{" "}
                {analytics.totalParticipants}
              </p>
            </div>

            {/* Participants Table */}
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
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
                            {user.score} / {analytics.questions.length}
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
