import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaVideo, FaBroadcastTower } from "react-icons/fa"; // Import icons from react-icons

export default function SidebarComp({ id, course }) {
  const [selected, setSelected] = useState(null);
  const handleSelect = (index) => {
    setSelected(index);
  };
  return (
    <>
      {course && course.units && (
        <Sidebar className="mt-4 text-black flex-col font-md hidden md:flex md:w-[15%] overflow-y-auto bg-gray-100">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <Menu>
                {course.units.map((unit, index) => (
                  <MenuItem
                    key={index}
                    component={<Link to={`${index + 1}`} />}
                    icon={<FaVideo />}
                    className={`font-semibold tracking-wide py-3 ${
                      selected === index
                        ? "bg-gray-200 cursor-default"
                        : "cursor-pointer"
                    }`}
                    onClick={() => handleSelect(index)}
                  >
                    {unit.name}
                  </MenuItem>
                ))}
                <MenuItem
                  component={<Link to="join-live-class" />}
                  icon={<FaBroadcastTower />}
                  className={`font-semibold tracking-wide py-3 ${
                    selected === "join-live-class"
                      ? "bg-gray-200 cursor-default"
                      : "cursor-pointer"
                  }`}
                  onClick={() => handleSelect("join-live-class")}
                >
                  Join Live Class
                </MenuItem>
              </Menu>
            </div>
          </div>
        </Sidebar>
      )}
    </>
  );
}
