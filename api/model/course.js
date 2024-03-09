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
  rating: {
    type: Number, 
    default:5,
  },
  reviews:[{
    user_name:{
      type:String,
    },
    user_comment:{
      type:String,
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Course = mongoose.model("Course", schema);

