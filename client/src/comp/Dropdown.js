import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Dropdown() {
  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Register</InputLabel>
      <Select labelId="demo-select-small-label" id="demo-select-small">
        <MenuItem>Register as Student</MenuItem>
        <MenuItem>Register as Tutor</MenuItem>
      </Select>
    </FormControl>
  );
}
