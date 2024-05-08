import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchField from "../components/SearchField";
import DiscreteSlider from "../components/DiscreteSlider";
import Experience from "../components/Experience";
import axios from "axios";
import StudentCard from "../components/StudentCard";

export default function StudentHome() {
  const [courses, setCourses] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [price, setPrice] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);

  const searchedCourses =
    searchQuery.length > 0
      ? courses.filter((course) =>
          `${course.language}`.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : courses;

  const filteredCourses =
    price !== "" || experience !== ""
      ? searchedCourses.filter(
          (course) =>
            (price !== "" ? course.pricing <= parseInt(price) : true) &&
            (experience !== ""
              ? course.tutor.experience <= parseInt(experience)
              : true)
        )
      : searchedCourses;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const {
          data: { result: coursesData },
        } = await axios.get(`http://localhost:8000/api/v1/course/getAll`, {
          withCredentials: true,
        });

        const courses = await Promise.all(
          coursesData.map(async (course) => {
            const tutor_id = course.tutor_id;
            const res = await axios.get(
              `http://localhost:8000/api/v1/tutor/${tutor_id}`
            );
            const tutorData = res.data.result;
            return { ...course, tutor: tutorData };
          })
        );

        setCourses(() => courses);
        //console.log(courses);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <div className="mt-10 mx-10 text-xl font-semibold">Loading...</div>;

  return (
    <>
      <Navbar />
      <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="flex flex-row gap-2">
        <DiscreteSlider price={price} setPrice={setPrice} />
        <Experience experience={experience} setExperience={setExperience} />
      </div>

      <div className="mt-10">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <StudentCard key={course._id} course={course} />
            ))
          ) : (
            <h1 className="text-3xl font-bold mx-10">No courses found</h1>
          )}
        </section>
      </div>
    </>
  );
}
