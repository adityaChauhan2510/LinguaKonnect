import React, { useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../index";

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

  return (
    <div className="text-center my-5">
      <h2 className="text-2xl font-bold">Create your personal account</h2>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name" className="text-lg font-bold py-2">
            UserName
          </label>
          <br />
          <input
            className="my-4"
            type="text"
            id="name"
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
