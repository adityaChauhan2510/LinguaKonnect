import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function SearchField({ searchQuery, setSearchQuery }) {
  return (
    <>
      <div className="items-center mx-10 my-4 flex flex-row">
        <TextField
          variant="outlined"
          label="Search courses ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="mx-2">
          <Button variant="contained" color="success">
            Search
          </Button>
        </div>
      </div>
      {/* <ul className="mt-2 mx-10">
        {data.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul> */}
    </>
  );
}
