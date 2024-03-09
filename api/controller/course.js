import { Course } from "../model/course.js";
import { User } from "../model/user.js";
import { Tutor } from "../model/tutor.js";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middleware/error.js";

export const addCourse = async (req, res, next) => {
  try {
    const { name, language, pricing, slot_time_in_min } = req.body;

    const tutorId = req.tutor._id;

    const course = await Course.create({
      name,
      language,
      tutor_id: tutorId,
      pricing,
      slot_time_in_min,
    });

    console.log(course);

    const tutor = await Tutor.findByIdAndUpdate(
      tutorId,
      { $push: { courses: course._id } },
      { new: true }
    );

    sendCookie(tutor, res, `Course added successfully`, 200);
  } catch (error) {
    next(error);
  }
};

export const enrollCourse = async (req, res, next) => {
  try {
    const { course_id } = req.body;
    const userId = req.user._id;

    // const user = await User.findByIdAndUpdate(
    //   { userId, "courses.courseId": { $ne: course_id } },
    //   {
    //     $addToSet: {
    //       courses: {
    //         courseId: course_id,
    //         notes: [],
    //       },
    //     },
    //   },
    //   { new: true }
    // );

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

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User already enrolled in the course",
      });
    }

    // Update the course's enrolled_students count
    const updatedCourse = await Course.findByIdAndUpdate(
      course_id,
      { $inc: { enrolled_students: 1 } },
      { new: true }
    );

    sendCookie(user, res, `Course enrolled successfully`, 200);
  } catch (error) {
    next(error);
  }
};

export const getCourseData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Course.findById(id);
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

    const data = await Course.findById(course_id);
    const nrating =
      (data.rating * data.enrolled_students + rating) /
      (data.enrolled_students + 1);

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
