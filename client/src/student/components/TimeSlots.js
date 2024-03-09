import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function TimeSlots() {
  const [slot, setSlot] = React.useState(1);

  const handleChange = (event) => {
    setSlot(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">slot</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={slot}
        label="slot"
        onChange={handleChange}
      >
        <MenuItem value={1}>3-3.45 pm</MenuItem>
        <MenuItem value={2}>4-5.00 pm</MenuItem>
        <MenuItem value={3}>7-8.30pm</MenuItem>
      </Select>
    </FormControl>
  );
}
