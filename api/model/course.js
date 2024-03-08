import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    unique: true,
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
  slot_time_in_min: {
    type: Number,
    required: true,
  },
  start_time_in_hours: {
    type: Date, 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Course = mongoose.model("Course", schema);

