import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "../comp/Dropdown";

// import "../path-to-your-stylesheet.css"; // Add the path to your stylesheet if you have one

const BackgroundImage = "/images/bg.png";

const HeaderStyle = {
  width: "100%",
  height: "100vh",
  background: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

export default function LandingPage() {
  return (
    <header style={HeaderStyle}>
      <h1 className="main-title text-center">Lingua-Konnect</h1>
      <p className="main-para text-center">Join us now and don't waste time</p>
      <div className="buttons text-center">
        <Link to="/login">
          <button className="primary-button">Log in as Student</button>
        </Link>
        <Link to="/tutorLogin">
          <button className="primary-button">Log in as Tutor</button>
        </Link>
        <Link to="/signup">
          <button className="primary-button">Register as Student</button>
        </Link>
        <Link to="/tutorSignup">
          <button className="primary-button">Register as Tutor</button>
        </Link>

        {/* <button className="bg-white">
          <Dropdown />
        </button> */}
      </div>
    </header>
  );
}
