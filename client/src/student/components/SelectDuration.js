import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectDuration() {
  const [duration, setDuration] = React.useState(45);

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
        <MenuItem value={45}>45 mins</MenuItem>
        <MenuItem value={60}>60 mins</MenuItem>
        <MenuItem value={90}>90 mins</MenuItem>
      </Select>
    </FormControl>
  );
}
