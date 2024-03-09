import { Course } from "../model/course.js";
import { User } from "../model/user.js";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middleware/error.js";

export const addCourse = async (req, res, next) => {
  try {
    const { name, language, pricing, slot_time_in_min, start_time_in_hours } = req.body;

    const tutorId = req.tutor._id;

    const course = await Course.create({
      name,
      language,
      tutor_id: tutorId,
      pricing,
      slot_time_in_min,
      start_time_in_hours,
    });

    console.log(course);

    // Update the tutor's courses array with the new course ID
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
  
      // Use findOneAndUpdate with $addToSet for atomic operation
      const user = await User.findOneAndUpdate(
        { _id: userId, "courses.courseId": { $ne: course_id } },
        {
          $addToSet: {
            courses: {
              courseId: course_id,
              notes: [], // Add notes if needed
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
    if (!data) return next(new ErrorHandler("Course doesn't Exist", 400));
    res.status(200).json({
      success: true,
      result: data,
    });
  } catch (err) {
    next(err);
  }
};
