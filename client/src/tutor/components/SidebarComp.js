import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaUpload, FaVideo } from "react-icons/fa"; // Import icons from react-icons

export default function SidebarComp({ id, course }) {
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
                    className="font-semibold tracking-wide py-3"
                  >
                    {unit.name}
                  </MenuItem>
                ))}
              </Menu>
            </div>

            <div>
              <Menu>
                <MenuItem
                  component={<Link to="new" />}
                  icon={<FaUpload />}
                  className="font-semibold tracking-wide py-3"
                >
                  Upload-New
                </MenuItem>
              </Menu>
            </div>
          </div>
        </Sidebar>
      )}
    </>
  );
}
