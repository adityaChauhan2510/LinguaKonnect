import { Course } from "../model/course.js";
import { User } from "../model/user.js";
import { Tutor } from "../model/tutor.js";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middleware/error.js";
import { processDoubt, processEnrollment } from "../utils/email.js";
import { Quiz } from "../model/quiz.js";

export const addCourse = async (req, res, next) => {
  try {
    const { name, language, pricing, duration, start_time, end_time, image } =
      req.body;
    const tutorId = req.tutor._id;

    const course = await Course.create({
      name,
      language,
      tutor_id: tutorId,
      pricing,
      time_durations: {
        duration,
        start_time,
        end_time,
      },
      image,
    });

    const tutor = await Tutor.findByIdAndUpdate(
      tutorId,
      { $push: { courses: course._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course added by tutor is successful",
      result: course,
    });
  } catch (error) {
    next(error);
  }
};

export const addChapter = async (req, res, next) => {
  try {
    const { chapterName, video_url, pdf_url, id } = req.body;

    const unit = {
      name: chapterName,
      video_url,
      pdf_urls: [pdf_url],
    };

    const course = await Course.findByIdAndUpdate(
      id,
      { $push: { units: unit } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Unit added to course successfully",
      course,
    });
  } catch (error) {
    next(error);
  }
};

export const addPDF = async (req, res, next) => {
  try {
    const { unit_id, pdf_url, id } = req.body;

    const course = await Course.findOneAndUpdate(
      { _id: id, "units._id": unit_id },
      { $push: { "units.$.pdf_urls": pdf_url } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "PDF added to course successfully",
      course,
    });
  } catch (error) {
    next(error);
  }
};

//add-comment to each unit
export const addComment = async (req, res, next) => {
  try {
    const { comment, course_id, unit_id } = req.body;
    let name;

    if (req.user) name = req.user.name;
    else name = req.tutor.name;

    const newComment = {
      user_name: name,
      user_comment: comment,
      created_at: new Date(),
    };

    const course = await Course.findOneAndUpdate(
      { _id: course_id, "units._id": unit_id },
      { $push: { "units.$.comments": newComment } },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course or unit not found" });
    }

    res.status(200).json({
      success: true,
      message: "Comment added to course successfully",
      course,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { course_id, unit_id, comment_id } = req.body;

    const course = await Course.findOneAndUpdate(
      { _id: course_id, "units._id": unit_id },
      { $pull: { "units.$.comments": { _id: comment_id } } },
      { new: true }
    );

    if (!course) {
      return res
        .status(404)
        .json({ message: "Course, unit, or comment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Comment deleted from course successfully",
      course,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDescription = async (req, res, next) => {
  try {
    const { description, id } = req.body;

    const course = await Course.findByIdAndUpdate(
      id,
      { $set: { description: description } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Description updated successfully",
      result: course,
    });
  } catch (err) {
    next(err);
  }
};

//enroll in course and send mail to teacher.
export const enrollCourse = async (req, res, next) => {
  try {
    const { course_id } = req.body;
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          courses: {
            courseId: course_id,
            notes: [],
          },
        },
      },
      { new: true }
    );

    const course = await Course.findByIdAndUpdate(
      course_id,
      {
        $inc: { enrolled_students: 1 },
      },
      { new: true }
    );

    const tutorId = course.tutor_id;
    const tutor = await Tutor.findById(tutorId);

    try {
      await processEnrollment(tutor.email, course.name, user.name);
    } catch (err) {
      return next(
        new ErrorHandler("Failed to purchase course. Try again later.", 500)
      );
    }

    sendCookie(user, res, `Course enrolled successfully...Start learning`, 200);
  } catch (error) {
    next(error);
  }
};

//ask doubt before purchasing via mail
export const askDoubt = async (req, res, next) => {
  try {
    const { course_id, doubt } = req.body;
    const userId = req.user._id;

    const course = await Course.findById(course_id);
    const user = await User.findById(userId);

    const tutorId = course.tutor_id;
    const tutor = await Tutor.findById(tutorId);

    try {
      await processDoubt(
        tutor.email,
        course.name,
        user.name,
        user.email,
        doubt
      );
    } catch (err) {
      return next(
        new ErrorHandler("Failed to send doubt. Try again later.", 500)
      );
    }

    sendCookie(user, res, `Doubt was sent successfully`, 200);
  } catch (error) {
    next(error);
  }
};

export const getCourseData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Course.findById(id).populate("tutor_id", "name");
    if (!data) return next(new ErrorHandler("Course doesn't exist", 404));
    res.status(200).json({
      success: true,
      result: data,
    });
  } catch (err) {
    next(err);
  }
};

export const addRating = async (req, res, next) => {
  try {
    const { course_id, rating } = req.body;
    const userId = req.user._id;

    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const courseIndex = user.courses.findIndex(
      (course) => course.courseId.toString() === course_id
    );

    const oldRating = user.courses[courseIndex].rating;
    user.courses[courseIndex].rating = rating;

    await user.save();

    const nrating =
      (course.rating * course.enrolled_students - oldRating + rating) /
      course.enrolled_students;

    const updatedCourse = await Course.findByIdAndUpdate(
      course_id,
      { $set: { rating: nrating } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Rating added successfully",
      result: updatedCourse,
    });
  } catch (err) {
    next(err);
  }
};

//using this in studentHome
export const getAllCourse = async (req, res, next) => {
  try {
    const data = await Course.find();

    if (!data || data.length === 0) {
      return next(new ErrorHandler("No courses found", 404));
    }

    res.status(200).json({
      success: true,
      result: data,
    });
  } catch (err) {
    next(err);
  }
};

//review for each course on course-dashboard
export const addReview = async (req, res, next) => {
  try {
    const { course_id, review } = req.body;
    const name = req.user.name;

    const updatedCourse = await Course.findByIdAndUpdate(
      course_id,
      {
        $push: {
          reviews: {
            user_name: name,
            user_comment: review,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Review added successfully",
      result: updatedCourse,
    });
  } catch (err) {
    next(err);
  }
};

export const checkEnroll = async (req, res, next) => {
  try {
    const { course_id } = req.body;
    const userData = await User.findById(req.user._id);

    if (
      userData &&
      userData.courses &&
      userData.courses.find((course) => course.courseId === course_id)
    ) {
      return res.status(200).json({
        success: true,
        message: "User Enrolled",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "User not enrolled",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);

    if (!course) return next(new ErrorHandler("Course doesn't exist", 404));

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    next(error);
  }
};

//create a quiz for a course by tutor.
export const createQuiz = async (req, res, next) => {
  try {
    const { title, description, type, questions } = req.body;
    const { id } = req.params; //course ID

    // Validate input
    if (!title || !type || !questions || questions.length === 0 || !id) {
      return next(new ErrorHandler("All fields are required!", 400));
    }

    // Check if course exists
    const course = await Course.findById(id);
    if (!course) {
      return next(new ErrorHandler("Course not found!", 404));
    }

    // Create the quiz
    const quiz = {
      title,
      description,
      type,
      questions,
      participated: 0,
      flawless: 0,
      createdAt: new Date(),
      participants: [],
    };

    // Add the quiz to the course
    course.quizzes.push(quiz);
    course.quizCurated += 1; // Increment the quiz count
    await course.save();

    res.status(200).json({
      success: true,
      message: "Quiz created successfully!",
      result: quiz,
    });
  } catch (error) {
    next(error);
  }
};

//quiz analytics for each quiz.
export const getQuizAnalytics = async (req, res) => {
  const { id, quizId } = req.params; // id = Course ID, quizId = Quiz ID
  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const quiz = course.quizzes.find((q) => q._id.toString() === quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const participantsWithNames = await Promise.all(
      quiz.participants.map(async (participant) => {
        const user = await User.findById(participant.userId).select("name");
        return {
          name: user ? user.name : "Unknown User",
          score: participant.score,
          attemptedAt: participant.attemptedAt,
        };
      })
    );

    const analyticsData = {
      title: quiz.title,
      description: quiz.description,
      totalParticipants: quiz.participants.length,
      questions: quiz.questions,
      participants: participantsWithNames,
    };

    res.status(200).json(analyticsData);
  } catch (error) {
    console.error("Error fetching quiz analytics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const submitQuiz = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    const { id, userID, responses } = req.body; // responses is an array of selected options

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const quiz = course.quizzes.find((q) => q._id.toString() === quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    //**Compute Score & Process Responses**
    let score = 0;
    const processedResponses = quiz.questions.map((question, index) => {
      const selectedOption = responses[index]; // Map response to the question using index
      const isCorrect = selectedOption === question.answer;

      if (isCorrect) score += 1;

      return {
        questionId: question.id,
        selectedOption,
        isCorrect,
      };
    });

    // **Update User Schema (attemptedQuizzes)**
    user.attemptedQuizzes.push({
      quizId,
      score,
      responses: processedResponses,
      attemptedAt: new Date(),
    });

    //**Update Quiz Schema (participants)**
    quiz.participants.push({
      userId: user._id,
      score,
      responses: processedResponses,
      attemptedAt: new Date(),
    });

    quiz.participated += 1;
    if (score === quiz.questions.length) {
      quiz.flawless += 1;
    }

    await user.save();
    await course.save();

    res.status(200).json({ message: "Quiz submitted successfully", score });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getQuizAnswers = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { userID, id } = req.body;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const quiz = course.quizzes.find((q) => q._id.toString() === quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const user = await User.findById(userID).select("attemptedQuizzes");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userAttempt = user.attemptedQuizzes.find(
      (attempt) => attempt.quizId.toString() === quizId
    );

    if (!userAttempt) {
      return res
        .status(404)
        .json({ message: "No attempt found for this quiz" });
    }

    //Prepare the response with questions, options, correct answers, and user answers
    const response = {
      quizDetails: {
        _id: quiz._id,
        title: quiz.title,
        questions: quiz.questions.map((q) => ({
          id: q.id,
          title: q.title,
          options: q.options,
          answer: q.answer, // Correct answer
        })),
      },
      userResponses: userAttempt.responses,
      userScore: userAttempt.score,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching quiz answers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const attemptedQuizzes = async (req, res) => {
  try {
    const { userID } = req.params;

    // Find user by studentID and get attempted quizzes
    const user = await User.findById(userID).select("attemptedQuizzes");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Extract quiz IDs from attemptedQuizzes
    const attemptedQuizIds = user.attemptedQuizzes.map((quiz) => quiz.quizId);

    res.status(200).json({ success: true, attemptedQuizIds });
  } catch (error) {
    console.error("Error fetching attempted quizzes:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.quizzes = [];
    await course.save();
    await User.updateMany({}, { $set: { attemptedQuizzes: [] } });
    return res
      .status(200)
      .json({ message: "Quiz deleted and all attempts cleared" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
