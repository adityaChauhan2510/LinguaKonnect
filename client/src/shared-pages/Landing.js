import { Link } from "react-router-dom";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

const BackgroundImage = "/images/bg.png";

const HeaderStyle = {
  width: "100%",
  height: "60vh",
  background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  textAlign: "center",
  padding: "20px",
};

const FooterStyle = {
  textAlign: "center",
  padding: "20px",
  background: "#222",
  color: "#fff",
  position: "absolute",
  bottom: 0,
  width: "100%",
};

export default function LandingPage() {
  return (
    <div>
      <header style={HeaderStyle}>
        <h3 className="main-title text-center">Lingua-Konnect</h3>
        <p className="text-center text-3xl p-5 italic">
          Knowledge of languages is the doorway to wisdom
        </p>
      </header>

      <div className="m-10 mx-auto flex flex-row justify-center gap-5">
        <Button
          sx={{ minWidth: 150 }}
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
        >
          Login
        </Button>

        <FormControl sx={{ minWidth: 150 }} size="medium">
          <InputLabel id="register-select-label">Register</InputLabel>
          <Select
            labelId="register-select-label"
            id="register-select"
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

      <footer style={FooterStyle}>
        <p>
          &copy; {new Date().getFullYear()} Lingua-Konnect. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
