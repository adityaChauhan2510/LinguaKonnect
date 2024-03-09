import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Context } from "../index";
import axios from "axios";
import { Navigate } from "react-router-dom";

const backgroundImage = "/images/bg2.jpg"; 

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

  if (isAuthenticated) return <Navigate to={"/studenthome"} />;

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
  };

  return (
    <div style={containerStyle} className="text-center m-auto">
      <h2>Login</h2>

      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email Address</label>
          <br />
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button id="sub_btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      <footer>
        <p>
          First time? <Link to="/signup">Create an account</Link>.
        </p>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
      <Toaster />
    </div>
  );
}
