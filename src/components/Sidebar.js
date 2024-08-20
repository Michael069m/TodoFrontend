import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
// import { FaTasks, FaCalendarAlt } from "react-icons/fa";

const Sidebar = ({ highlight }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const cookies = Cookies.get("userData");
    if (!cookies) {
      navigate("/login");
    }
  }, []);
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:8000/logout", {
        withCredentials: true,
      });
      Cookies.remove("userData"); // Remove user data cookie
      console.log(response);

      // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className=" h-full border-r-[2px] border-solid border-[rgb(228,224,138)]">
      <div className="p-4  h-full w-[20vw] flex flex-col">
        <h2 className="text-[40px] font-bold mb-8">Menu</h2>
        <ul className="space-y-4 h-full relative ">
          <Link
            to="/"
            className={`flex ${highlight == 1 ? `bg-[rgba(91,99,255,0.25)]` : ``}  items-center p-2 text-lg font-medium hover:text-white text-gray-700 cursor-pointer hover:bg-[rgb(91,98,255)] rounded-lg`}
          >
            {/* <FaTasks className="mr-2" /> */}
            Tasks
          </Link>
          <Link
            to="/calender"
            className={`flex ${highlight == 2 ? `bg-[rgba(91,99,255,0.25)]` : ``}  items-center p-2 text-lg font-medium hover:text-white text-gray-700 cursor-pointer hover:bg-[rgb(91,98,255)] rounded-lg`}
          >
            {/* <FaCalendarAlt className="mr-2" /> */}
            Calendar
          </Link>
          <li
            onClick={handleLogout}
            className="flex absolute bottom-8 w-full items-baseline p-2 text-lg font-medium hover:text-white text-gray-700 cursor-pointer hover:bg-[rgb(91,98,255)]  rounded-lg"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
