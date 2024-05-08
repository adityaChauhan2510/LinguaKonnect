import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectDuration({ Duration, duration, setDuration }) {

  const handleChange = (event) => {
    setDuration(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Duration</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={duration}
        label="Duration"
        onChange={handleChange}
      >
        {Duration &&
          Duration.map((time) => (
            <MenuItem key={time} value={time}>
              {time} mins
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
