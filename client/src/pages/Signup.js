import React, { useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../index";

const backgroundImage = "/images/bg2.jpg"; // Update with the actual path

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/user/new",
        {
          name,
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
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
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
      <h1>Join us</h1>
      <h5>Create your personal account</h5>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">UserName</label>
          <br />
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div>
          <label htmlFor="email">Email address</label>
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

        <p>
          <input type="checkbox" name="checkbox" id="checkbox" required />{" "}
          <span>I agree to all statements in terms of service</span>.
        </p>

        <div>
          <button type="submit">Register</button>
        </div>
      </form>

      <footer>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
      <Toaster />
    </div>
  );
}
