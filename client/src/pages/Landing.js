import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "../comp/Dropdown";

const BackgroundImage = "/images/bg.png";

export default function LandingPage() {
  return (
    <header>
      <h1 className="main-title text-center">Lingua-Konnect</h1>
      <p className="main-para text-center">join us now and don't waste time</p>
      <div className="buttons text-center">
        <Link to="/login">
          <button className="primary-button">log in</button>
        </Link>

        <button className="bg-white">
          <Dropdown />
        </button>
      </div>
    </header>
  );
}

const HeaderStyle = {
  width: "100%",
  height: "100vh",
  background: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};
