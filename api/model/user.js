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
  attemptedQuizzes: [
    {
      quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
      },
      score: {
        type: Number,
        required: true,
      },
      attemptedAt: {
        type: Date,
        default: Date.now,
      },
      responses: [
        {
          questionId: {
            type: Number,
            required: true,
          },
          selectedOption: {
            type: Number,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            required: true,
          },
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", schema);
