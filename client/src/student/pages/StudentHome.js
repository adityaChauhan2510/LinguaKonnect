import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchField from "../components/SearchField";
import DiscreteSlider from "../components/DiscreteSlider";
import Experience from "../components/Experience";
import axios from "axios";

export default function StudentHome() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const searchedCourses =
    searchQuery.length > 0
      ? data.filter((course) =>
          `${course.language}`.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/course/getAll`,
          {
            withCredentials: true,
          }
        );
        setData(response.data.result);
        console.log(response.data.result);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="flex flex-row gap-5">
        <DiscreteSlider />
        <Experience />
      </div>

      <div className="mt-10">{searchedCourses}</div>
    </>
  );
}
