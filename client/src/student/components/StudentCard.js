import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

/*
courseName,
language,
instructorName,
rating,

*/

export default function StudentCard({ course }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/course/:${course._id}`); // Assuming 'item' has an '_id' property
  }

  return (
    <div className="shadom-5xl my-7 px-5">
      <Card
        sx={{ backgroundColor: "#ccc", cursor: "pointer" }}
        onClick={handleClick}
      >
        <CardHeader title={course.name} />
        <CardMedia
          component="img"
          height="60"
          image="images/images.jpeg"
          alt="Image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {course.language}
          </Typography>
        </CardContent>
        {/* <CardContent>
          <Typography variant="body2" color="text.secondary">
            {course.rating}
          </Typography>
        </CardContent> */}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {course.tutor.name}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
