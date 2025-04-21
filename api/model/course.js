import mongoose from "mongoose";
import { unitSchema } from "./unit.js";
import { quizSchema } from "./quiz.js";

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
  image: {
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

  rating: {
    type: Number,
    default: 0,
  },

  quizCurated: {
    type: Number,
    default: 0,
  },
  quizAttended: {
    type: Number,
    default: 0,
  },
  quizFlawless: {
    type: Number,
    default: 0,
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

  units: [unitSchema],
  quizzes: [quizSchema],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Course = mongoose.model("Course", schema);
