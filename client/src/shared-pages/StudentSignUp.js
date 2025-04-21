import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import RotatingLineLoader from "../shared-ui/RotatingLineLoader";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const navigate = useNavigate();

  useEffect(() => {
    if (otpSent && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [otpSent, timeLeft]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/new`,
        { name, email, password },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/verify`,
        { name, email, password, otp },
        { withCredentials: true }
      );
      sessionStorage.setItem("token", response.data.token);
      toast.success(response.data.message);
      navigate("/studenthome");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <RotatingLineLoader />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold pb-7  text-gray-900 underline">
          Student Register
        </h2>
        {!otpSent ? (
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-bold text-gray-700"
              >
                UserName
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                type="text"
                id="name"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-bold text-gray-700"
              >
                Email address
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                type="email"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-bold text-gray-700"
              >
                Password
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                type="password"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <p className="text-gray-600 text-sm">
              <input type="checkbox" required className="mr-2" /> I agree to all
              statements in terms of service.
            </p>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Register
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtpHandler} className="space-y-4">
            <div>
              <label
                htmlFor="otp"
                className="block text-lg font-bold text-gray-700"
              >
                Enter OTP
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                type="text"
                id="otp"
                required
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>
            <p className="text-red-500 font-bold">
              Time left: {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </p>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              disabled={timeLeft === 0}
            >
              Verify
            </button>
          </form>
        )}
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
