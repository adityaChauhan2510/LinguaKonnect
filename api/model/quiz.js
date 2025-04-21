import mongoose from "mongoose";

export const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  questions: [
    {
      id: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      options: [
        {
          id: {
            type: Number,
            required: true,
          },
          value: {
            type: String,
            required: true,
          },
        },
      ],
      answer: {
        type: Number,
        required: true,
      },
      timeLimit: {
        type: Number, // Time in seconds
        required: true,
        default: 60,
      },
    },
  ],
  participated: {
    type: Number,
    default: 0,
  },
  flawless: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  participants: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      score: {
        type: Number,
        required: true,
        default: 0,
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
});

export const Quiz = mongoose.model("Quiz", quizSchema);
