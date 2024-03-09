import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Context } from "../index";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function TutorLogin() {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/tutor/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      setLoading(false);
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/tutorhome"} />;

  return (
    <div className="text-center my-20">
      <h2 className="text-2xl font-bold">Login</h2>

      <form onSubmit={submitHandler}>
        <div className="my-2 px-2">
          <label htmlFor="email" className="text-lg font-bold py-2">
            Email Address
          </label>
          <br />
          <input
            className="my-4"
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
            className="my-4"
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
          First time? <Link to="/tutorsignup">Create an account</Link>.
        </p>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
      <Toaster />
    </div>
  );
}
