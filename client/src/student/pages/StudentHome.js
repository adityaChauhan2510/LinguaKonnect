import React from "react";
import Navbar from "../components/Navbar";
import SearchField from "../components/SearchField";
import DiscreteSlider from "../components/DiscreteSlider";
import Experience from "../components/Experience";

export default function StudentHome() {
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
