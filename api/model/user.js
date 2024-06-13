import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  courses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      rating: {
        type: Number,
        default: 0,
      },
    },
  ],
});

export const User = mongoose.model("User", schema);
