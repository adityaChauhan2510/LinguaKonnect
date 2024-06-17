import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/new`,
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );

      const { token } = response.data;
      sessionStorage.setItem("token", token);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
    navigate("/studenthome");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="text-center my-5">
      <h2 className="text-2xl font-bold">Student Register</h2>
      <form onSubmit={submitHandler} className="login-form">
        <div>
          <label htmlFor="name" className="text-lg font-bold py-2">
            UserName
          </label>
          <br />
          <input
            className="my-4 px-2"
            type="text"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div>
          <label htmlFor="email" className="text-lg font-bold py-2">
            Email address
          </label>
          <br />
          <input
            className="my-4 px-2"
            type="email"
            id="email"
            required
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
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <p>
          <input type="checkbox" name="checkbox" id="checkbox" required />{" "}
          <span>I agree to all statements in terms of service</span>.
        </p>

        <div className="mt-5">
          <button
            type="submit"
            className="bg-green-800 px-10 py-2 text-white rounded-lg"
          >
            Register
          </button>
        </div>
      </form>

      <footer>
        <button>
          <Link
            to="/"
            className="bg-yellow-600 px-10 py-2 text-white rounded-lg"
          >
            Back to Homepage
          </Link>
          .
        </button>
      </footer>
      <Toaster />
    </div>
  );
}
