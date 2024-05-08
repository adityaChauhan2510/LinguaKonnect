import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function TimeSlots({ time_durations, slot, setSlot }) {
  const handleChange = (event) => {
    setSlot(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Slot</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={slot}
        label="Slot"
        onChange={handleChange}
      >
        {time_durations &&
          time_durations.map((time) => (
            <MenuItem key={time._id} value={time._id}>
              {time.start_time} - {time.end_time}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
