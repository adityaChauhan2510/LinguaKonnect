import mongoose from "mongoose";
import { unitSchema } from "./unit.js";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  language: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  tutor_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Tutor",
  },

  enrolled_students: {
    type: Number,
    default: 0,
  },
  pricing: {
    type: Number,
    required: true,
  },
  time_durations: [
    {
      duration: {
        type: String,
        required: true,
      },
      start_time: {
        type: String,
        required: true,
      },
      end_time: {
        type: String,
        required: true,
      },
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user_name: {
        type: String,
      },
      user_comment: {
        type: String,
      },
    },
  ],

  image: {
    type: String,
  },

  units: [unitSchema],
});

export const Course = mongoose.model("Course", schema);
