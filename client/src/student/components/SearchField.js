import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function SearchField({ searchQuery, setSearchQuery }) {
  return (
    <>
      <div className="items-center m-10 flex flex-row">
        <TextField
          variant="outlined"
          label="Search courses ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 45,
              alignItems: "center",
            },
          }}
        />

        <div className="mx-2">
          <Button
            variant="contained"
            color="success"
            sx={{ height: 45, minWidth: 120 }}
          >
            Search
          </Button>
        </div>
      </div>
    </>
  );
}
