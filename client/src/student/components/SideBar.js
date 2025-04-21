import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaVideo, FaBroadcastTower, FaClipboardList } from "react-icons/fa";

export default function SideBar({ course, selected, setSelected }) {
  const handleSelect = (index) => {
    setSelected(index);
  };
  return (
    <>
      {course && course.units && (
        <Sidebar className=" text-black flex-col hidden md:flex md:w-[15%] overflow-y-auto bg-gradient-to-b from-gray-300 to-gray-400">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col">
              <Menu>
                {course.units.map((unit, index) => (
                  <MenuItem
                    key={index}
                    component={<Link to={`${index + 1}`} />}
                    icon={<FaVideo />}
                    className={`font-semibold tracking-wide rounded-lg py-3 transition-all duration-30 ${
                      selected === index
                        ? "bg-gray-400 shadow-md !cursor-default"
                        : "cursor-pointer hover:bg-gray-100"
                    }`}
                    onClick={() => handleSelect(index)}
                    style={selected === index ? { pointerEvents: "none" } : {}}
                  >
                    {unit.name}
                  </MenuItem>
                ))}

                {/* Quizzes Menu Item */}
                <MenuItem
                  component={<Link to="quiz" />}
                  icon={<FaClipboardList />}
                  className={`font-semibold tracking-wide rounded-lg py-3 transition-all duration-300 ${
                    selected === "quiz"
                      ? "bg-gray-400 shadow-md !cursor-default"
                      : "cursor-pointer hover:bg-gray-100"
                  }`}
                  onClick={() => handleSelect("quiz")}
                  style={selected === "quiz" ? { pointerEvents: "none" } : {}}
                >
                  Test yourself
                </MenuItem>

                {/* Join Live Class */}
                <MenuItem
                  component={<Link to="join-live-class" />}
                  icon={<FaBroadcastTower />}
                  className={`font-semibold tracking-wide rounded-lg py-3 ${
                    selected === "join-live-class"
                      ? "bg-gray-400 shadow-md !cursor-default"
                      : "cursor-pointer hover:bg-gray-100"
                  }`}
                  style={
                    selected === "join-live-class"
                      ? { pointerEvents: "none" }
                      : {}
                  }
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
