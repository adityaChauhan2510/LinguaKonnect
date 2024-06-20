import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const links = [
  { url: "/tutorhome", title: "Home" },
  { url: "/tutorprofile", title: "Profile" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const logoutHandler = async () => {
    setLogoutLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/tutor/logout`,
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
    setLogoutLoading(false);
    navigate("/");
  };

  return (
    <div className="bg-black flex justify-between items-center w-[100%] p-2 text-white">
      <h1 className="w-full text-4xl font-bold py-3 text-[#00df9a] px-10">
        LinguaKonnect
      </h1>

      <ul className="hidden md:flex">
        {links.map((link) => (
          <NavLink key={link.url} to={link.url}>
            <li className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
              {link.title}
            </li>
          </NavLink>
        ))}

        <button
          onClick={logoutHandler}
          className={`p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black ${
            logoutLoading ? "opacity-70 pointer-events-none" : ""
          }`}
          disabled={logoutLoading}
        >
          {logoutLoading ? "Logging out..." : "Logout"}
        </button>
      </ul>

      <div className="md:hidden">
        {/* MENU BUTTON */}
        <button
          className="h-4 flex flex-col justify-between z-50 relative"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="w-5 h-[2px] bg-white rounded"></div>
          <div className="w-5 h-[2px] bg-white rounded"></div>
          <div className="w-5 h-[2px] bg-white rounded"></div>
        </button>

        {/* MENU LIST */}
        {open && (
          <div className="absolute top-0 left-0 w-screen h-[11rem] bg-black text-white flex flex-col items-center text-xl gap-2">
            <ul>
              {links.map((link) => (
                <NavLink key={link.url} to={link.url}>
                  <li className="p-2 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
                    {link.title}
                  </li>
                </NavLink>
              ))}

              <button
                onClick={logoutHandler}
                className={`p-2 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black ${
                  logoutLoading ? "opacity-70 pointer-events-none" : ""
                }`}
                disabled={logoutLoading}
              >
                {logoutLoading ? "Logging out..." : "Logout"}
              </button>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
