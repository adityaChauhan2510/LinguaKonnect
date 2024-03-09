import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import StudentCard from "../components/StudentCard";
import { Context } from "../../index";

export default function StudentProfile() {
  const [data, setData] = useState({});

  //const data = user.courses;

  const { user, isAuthenticated } = useContext(Context);

  console.log(user);

  return (
    <>
      <Navbar />
      <h1 className="mx-10 my-10 text-3xl font-bold">Courses Taken</h1>

      <div className="mt-10 mx-10">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
          {data.length > 0 ? (
            data.map((course) => (
              <StudentCard key={course.id} course={course} />
            ))
          ) : (
            <h1 className="text-1xl font-semibold">No courses purchased!!!</h1>
          )}
        </section>
      </div>
    </>
  );
}
