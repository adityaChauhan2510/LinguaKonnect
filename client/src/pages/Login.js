import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // if (email && password) {
    //   login(email, password);
    // } else {
    //   toast.error("Fill login details.");
    // }
  }

  // useEffect(
  //   function () {
  //     if (isVerified) {
  //       navigate("/home", { replace: true });
  //     }
  //   },
  //   [isVerified, navigate]
  // );

  return (
    <div className="text-center m-5-auto">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
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
          <button id="sub_btn" type="submit">
            Login
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
