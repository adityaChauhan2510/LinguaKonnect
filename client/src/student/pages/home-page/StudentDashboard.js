//Home page for student

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import SearchField from "../../components/SearchField";
import PriceSlider from "../../components/PriceSlider";
import Experience from "../../components/Experience";
import CourseCard from "../../components/CourseCard";
import Loading from "../../components/Loading";
import { Footer } from "../../../shared-ui/Footer";
import axios from "axios";

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
        } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/course/getAll`,
          {
            withCredentials: true,
          }
        );

        //console.log(coursesData);

        const courses = await Promise.all(
          coursesData.map(async (course) => {
            const tutor_id = course.tutor_id;
            const res = await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}/api/v1/tutor/${tutor_id}`
            );
            const tutorData = res.data.result;
            return { ...course, tutor: tutorData };
          })
        );

        //console.log(courses);

        setCourses(() => courses);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      {filteredCourses && (
        <>
          <Navbar />
          <SearchField
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <div className="flex flex-row gap-2">
            <PriceSlider price={price} setPrice={setPrice} />
            <Experience experience={experience} setExperience={setExperience} />
          </div>

          <div className="my-10 h-screen">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))
              ) : (
                <h1 className="text-3xl font-bold mx-10">No courses found</h1>
              )}
            </section>
          </div>

          <div className="h-[5rem]"></div>
          <Footer />
        </>
      )}
    </>
  );
}
