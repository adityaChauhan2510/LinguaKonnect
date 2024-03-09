import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Context } from "../../index";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });

      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    navigate("/");
  }

  return (
    <div className="bg-black flex justify-between items-center h-24 w-[100%] mx-auto px-4 text-white">
      {/* Logo */}
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">
        LinguaKonnect
      </h1>

      <ul className="hidden md:flex">
        <NavLink to="/studenthome">
          <li className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
            Home
          </li>
        </NavLink>
        <NavLink to="/studentprofile">
          <li className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
            Profile
          </li>
        </NavLink>
        <button
          onClick={logoutHandler}
          className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
        >
          Logout
        </button>
      </ul>
    </div>
  );
};

export default Navbar;
