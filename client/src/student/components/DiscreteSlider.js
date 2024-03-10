import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSlider({ price, setPrice }) {
  const handleChange = (event, newValue) => {
    setPrice(newValue);
  };

  return (
    <Box sx={{ width: 200, ml: "50px", mt: "10px" }}>
      <Slider
        aria-label="Experience"
        defaultValue={2000}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        onChange={handleChange}
        shiftStep={500}
        step={500}
        marks
        min={1000}
        max={8000}
      />
    </Box>
  );
}
