import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Navbar = () => {
  // const { isAuthenticated, setIsAuthenticated} =
  // useContext(Context);

  // const handleClick = async (e) => {

  //   try {
  //     const {data}=await axios.get("http://localhost:4000/api/v1/artist/logout", {
  //       withCredentials: true,
  //     });

  //     toast.success(data.message);
  //     setIsAuthenticated(false);

  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //     setIsAuthenticated(true);

  //   }

  // };

  // if (!isAuthenticated) return <Navigate to={"/login"} />;

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
          //onClick={handleClick}
          className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
        >
          Logout
        </button>
      </ul>
    </div>
  );
};

export default Navbar;
