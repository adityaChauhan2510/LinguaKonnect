import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function TutorLogin() {
  const [email, setEmail] = useState("fakeuser005jake@gmail.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/tutor/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const { token } = response.data;
      sessionStorage.setItem("token", token);
      toast.success(response.data.message);
      navigate("/tutorhome");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center my-20">
      <h2 className="text-2xl font-bold">Login</h2>

      <form onSubmit={submitHandler} className="login-form">
        <div className="my-2 px-2">
          <label htmlFor="email" className="text-lg font-bold py-2">
            Email Address
          </label>
          <br />
          <input
            className="my-4 px-2"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div>
          <label htmlFor="password" className="text-lg font-bold py-2">
            Password
          </label>
          <br />
          <input
            className="my-4 px-2"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button
            id="sub_btn"
            type="submit"
            disabled={loading}
            className="bg-green-800 px-10 py-2 text-white rounded-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      <footer>
        <p>
          First time?{" "}
          <Link to="/signup" className="font-semibold">
            Create an account
          </Link>
          .
        </p>
        <p className="font-semibold">
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}
