import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchField from "../components/SearchField";
import DiscreteSlider from "../components/DiscreteSlider";
import Experience from "../components/Experience";
import axios from "axios";

export default function StudentHome() {
  const [mergedData, setMergedData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/course/getAll`,
          {
            withCredentials: true,
          }
        );

        const data1 = response.data.result;
        console.log(data1);

       
        const tutorDataPromises = data1.map(async (element) => {
          const tutor_id = element.tutor_id;
          const response2 = await axios.get(
            `http://localhost:8000/api/v1/tutor/${tutor_id}`
          );
          return response2.data.result;
        });

        
        const tutorDataArray = await Promise.all(tutorDataPromises);

       
        const mergedData = data1.map((element, index) => ({
          ...element,
          tutor: tutorDataArray[index],
        }));

        setMergedData(mergedData);
        console.log(mergedData);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchData();
  }, []); 

  return (
    <>
      <Navbar />
      <SearchField />
      <div className="flex flex-row gap-5">
        <DiscreteSlider />
        <Experience />
      </div>
    </>
  );
}
