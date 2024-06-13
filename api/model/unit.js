import mongoose from "mongoose";

export const unitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  video_url: {
    type: String,
    required: true,
  },

  pdf_urls: [
    {
      type: String,
    },
  ],
  comments: [
    {
      user_name: {
        type: String,
      },
      user_comment: {
        type: String,
      },
    },
  ],
});

// // Optional: Export Unit model if needed
// export const Unit = mongoose.model("Unit", unitSchema);
