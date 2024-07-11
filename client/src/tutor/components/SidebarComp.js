import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaUpload, FaVideo, FaBroadcastTower, FaEdit } from "react-icons/fa"; // Import icons from react-icons

export default function SidebarComp({ id, course }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => {
    setSelected(index);
  };

  return (
    <>
      {course && course.units && (
        <Sidebar className="m-5 text-black font-md flex-col hidden md:flex md:w-[15%] overflow-y-auto bg-gray-100">
          <div className="flex flex-col justify-between h-full">
            <div>
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
              </Menu>
            </div>

            <div className="my-[2.5rem]">
              <Menu>
                <MenuItem
                  component={<Link to="live-class" />}
                  icon={<FaBroadcastTower />}
                  className={`font-semibold tracking-wide py-3 ${
                    selected === "live-class"
                      ? "bg-gray-200 cursor-default"
                      : "cursor-pointer"
                  }`}
                  onClick={() => handleSelect("live-class")}
                >
                  Start Live Class
                </MenuItem>
                <MenuItem
                  component={<Link to="new" />}
                  icon={<FaUpload />}
                  className={`font-semibold tracking-wide py-3 ${
                    selected === "new"
                      ? "bg-gray-200 cursor-default"
                      : "cursor-pointer"
                  }`}
                  onClick={() => handleSelect("new")}
                >
                  Add Unit
                </MenuItem>
                <MenuItem
                  component={<Link to="update" />}
                  icon={<FaEdit />}
                  className={`font-semibold tracking-wide py-3 ${
                    selected === "update"
                      ? "bg-gray-200 cursor-default"
                      : "cursor-pointer"
                  }`}
                  onClick={() => handleSelect("update")}
                >
                  Update
                </MenuItem>
              </Menu>
            </div>
          </div>
        </Sidebar>
      )}
    </>
  );
}
