import { Course } from "../model/course.js";
import { User } from "../model/user.js";
import { Tutor } from "../model/tutor.js";
import { sendCookie } from "../utils/feature.js";
import { getRedisClient } from "../db/database.js";
import ErrorHandler from "../middleware/error.js";
import axios from "axios";

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
    console.log(id);

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
    const tutorEmail = tutor.email;

    const task = {
      tutor_email: tutorEmail,
      course_name: course.name,
      student_name: user.name,
    };

    const redisClient = getRedisClient();
    await redisClient.lPush("courseEnrollment", JSON.stringify(task));
    // console.log(result);

    // const response = await axios.post("http://localhost:6000/api/purchase", {
    //   tutor_email: tutorEmail,
    //   course_name: course.name,
    //   student_name: user.name,
    // });
    //console.log(response.data);

    sendCookie(user, res, `Course enrolled successfully...Start learning`, 200);
  } catch (error) {
    next(error);
  }
};

export const askDoubt = async (req, res, next) => {
  try {
    const { course_id, doubt } = req.body;
    const userId = req.user._id;

    const course = await Course.findById(course_id);
    const user = await User.findById(userId);

    const tutorId = course.tutor_id;
    const tutor = await Tutor.findById(tutorId);
    const tutorEmail = tutor.email;

    const task = {
      tutor_email: tutorEmail,
      course_name: course.name,
      student_name: user.name,
      student_email: user.email,
      doubt,
    };

    const redisClient = getRedisClient();
    const result = await redisClient.lPush(
      "studentDoubt",
      JSON.stringify(task)
    );
    //console.log(result);

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

    console.log(updatedCourse.rating);

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
