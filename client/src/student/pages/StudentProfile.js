import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import StudentCard from "../components/StudentCard";
import { Context } from "../../index";

export default function StudentProfile() {
  const [data, setData] = useState([]);
  const { user, isAuthenticated } = useContext(Context);

  console.log(user)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/user/getCourses`,
          {
            withCredentials: true,
          }
        );
  
        console.log("API Response:", response);
  
        setData(response.data.result);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };
  
    fetchData();
  }, []);

  console.log(data)

  return (
    <>
      <Navbar />
      <h1 className="mx-10 my-10 text-3xl font-bold">Courses Taken</h1>

      <div className="mt-10 mx-10">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
          {data.length > 0 ? (
            data.map((course) => (
              <StudentCard key={course._id} course={course} />
            ))
          ) : (
            <h1 className="text-1xl font-semibold">No courses purchased!!!</h1>
          )}
        </section>
      </div>
    </>
  );
}
