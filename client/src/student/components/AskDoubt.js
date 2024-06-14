import React, { useState } from "react";
import { Button, CardMedia, Modal, TextField, Box } from "@mui/material";

export default function AskDoubt({
  doubt,
  setDoubt,
  handleDoubtSubmit,
  openDoubtModal,
  setOpenDoubtModal,
}) {
  const handleOpenDoubtModal = () => setOpenDoubtModal(true);
  const handleCloseDoubtModal = () => setOpenDoubtModal(false);
  return (
    <div className="">
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpenDoubtModal}
        className="grow-shrink-button"
      >
        Ask Your Doubt 💡✅✅
      </Button>

      <Modal
        open={openDoubtModal}
        onClose={handleCloseDoubtModal}
        aria-labelledby="ask-doubt-modal-title"
        aria-describedby="ask-doubt-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <form onSubmit={handleDoubtSubmit}>
            <TextField
              label="Your Doubt"
              multiline
              rows={4}
              value={doubt}
              onChange={(e) => setDoubt(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <div className="my-5">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mt-2"
              >
                Send Mail 📩
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
