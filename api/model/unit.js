import mongoose from "mongoose";
import moment from "moment";

const commentSchema = new mongoose.Schema({
  user_name: {
    type: String,
  },
  user_comment: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

commentSchema.virtual("relative_time").get(function () {
  return moment(this.created_at).fromNow();
});

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
  comments: [commentSchema],
});
