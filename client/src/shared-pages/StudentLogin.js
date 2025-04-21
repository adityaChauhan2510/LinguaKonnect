import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Loading from "../student/components/Loading";

export default function Login() {
  const [email, setEmail] = useState("adityachauhan2501@gmail.com");
  const [password, setPassword] = useState("12345");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const { token, role } = response.data;
      sessionStorage.setItem("token", token);

      toast.success(response.data.message);

      // Navigate based on role
      if (role === "tutor") navigate("/tutorhome");
      else navigate("/studenthome");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold pb-7  text-gray-900 underline">
          Login
        </h2>

        <form onSubmit={submitHandler} className="space-y-4">
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

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Homepage
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
