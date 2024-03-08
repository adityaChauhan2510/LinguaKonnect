import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const dummy = [
  { id: 1, text: "Hindi" },
  { id: 2, text: "English" },
  { id: 3, text: "German" },
  { id: 4, text: "French" },
  { id: 5, text: "Chinese" },
];

export default function SearchField() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [price, setPrice] = useState([2000, 5000]);

  const inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setText(lowerCase);

    //req to backend to send array of all courses to frontend

    const filteredData = dummy.filter((el) => {
      if (lowerCase === "") {
        return false; // Return true to include all items when the input is empty
      } else {
        return el.text.toLowerCase().includes(lowerCase);
      }
    });

    setData(filteredData);
  };

  return (
    <>
      <div className="items-center mx-10 my-4 flex flex-row">
        <TextField
          variant="outlined"
          label="Search courses ..."
          onChange={inputHandler}
        />

        <div className="mx-2">
          <Button variant="contained" color="success">
            Search
          </Button>
        </div>
      </div>
      <ul className="mt-2 mx-10">
        {data.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </>
  );
}
