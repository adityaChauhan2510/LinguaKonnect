import mongoose from "mongoose";

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
  slot_time_in_min: [
    {
      type: Number,
      required: true,
    },
  ],
  time_durations: [
    {
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Course = mongoose.model("Course", schema);
