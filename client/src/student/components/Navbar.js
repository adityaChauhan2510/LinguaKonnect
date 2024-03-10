import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    setLogoutLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/user/logout",
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
    <div className="bg-black flex justify-between items-center h-24 w-[100%] mx-auto px-4 text-white">
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">
        LinguaKonnect
      </h1>

      <ul className="hidden md:flex">
        <NavLink to="/studenthome">
          <li className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
            Home
          </li>
        </NavLink>
        <NavLink to="/mycart">
          <li className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
            MyCart
          </li>
        </NavLink>
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
    </div>
  );
};

export default Navbar;
