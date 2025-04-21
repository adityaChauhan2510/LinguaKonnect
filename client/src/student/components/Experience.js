import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Experience({ experience, setExperience }) {
  const handleChange = (event) => {
    setExperience(event.target.value);
  };

  return (
    <FormControl sx={{ ml: 3, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label" sx={{ fontSize: "0.95rem" }}>
        Experience
      </InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={experience}
        label="Experience"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={1}>{"<"} 1 year</MenuItem>
        <MenuItem value={3}>{"<"} 3 years</MenuItem>
        <MenuItem value={15}>{">"} 5 years</MenuItem>
      </Select>
    </FormControl>
  );
}
