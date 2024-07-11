import React, { useState } from "react";
import { Button, TextField, Box, Container, Typography } from "@mui/material";
import { createNewRoom } from "./api";

const WelcomeScreenContainer = ({ setData }) => {
  const [meetingId, setMeetingId] = useState("");

  const handleViewerClick = () => setData({ mode: "VIEWER", meetingId });

  return (
    <Container maxWidth="sm">
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TextField
          variant="outlined"
          label="Enter Meeting ID"
          value={meetingId}
          onChange={(e) => setMeetingId(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewerClick}
          sx={{ width: "100%" }}
        >
          Join as Viewer
        </Button>
      </Box>
    </Container>
  );
};

export default WelcomeScreenContainer;
