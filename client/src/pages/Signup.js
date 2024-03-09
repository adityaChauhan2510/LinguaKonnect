import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    // e.preventDefault();
    // if (name && email && password) {
    //   signup(name, email, password);
    // } else {
    //   toast.error("Fill signup details.");
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
      <h1>Join us</h1>
      <h5>Create your personal account</h5>
      <form onSubmit={handleSubmit}>
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
          <span>I agree all statements in terms of service</span>.
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
