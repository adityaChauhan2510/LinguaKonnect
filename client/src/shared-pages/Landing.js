import { Link } from "react-router-dom";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BackgroundImage = "/images/bg.png";

const HeaderStyle = {
  width: "100%",
  height: "70vh",
  background: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

export default function LandingPage() {
  return (
    <div>
      <header style={HeaderStyle}>
        <h1 className="main-title text-center">Lingua-Konnect</h1>
        <p className="main-para text-center">
          Knowledge of languages is the doorway to wisdom
        </p>
      </header>

      <div className="my-10 mx-auto flex flex-row justify-center gap-5">
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Login</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Login"
          >
            <MenuItem component={Link} to="/login">
              Student
            </MenuItem>
            <MenuItem component={Link} to="/tutorlogin">
              Tutor
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Register</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Register"
          >
            <MenuItem component={Link} to="/signup">
              Student
            </MenuItem>
            <MenuItem component={Link} to="/tutorsignup">
              Tutor
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
