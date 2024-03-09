import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middleware/error.js";
import axios from "axios"

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id);
    if (!data) return next(new ErrorHandler("User doesn't Exist", 400));
    res.status(200).json({
      success: true,
      result: data,
    });
  } catch (err) {
    next(err);
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

export const editProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const userId = req.user._id; // Assuming you have the user ID in the request

    let user = await User.findByIdAndUpdate(userId, { name, email }, { new: true });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Updated Successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getEnrolledCourses = async (req, res, next) => {
  try {
    const enrolledCourses = req.user.courses || [];

    const coursesData = await Promise.all(
      enrolledCourses.map(async (course) => {
        const courseId = course.courseId;
        // Assuming there's a route to get course details by courseId
        const courseDetailsResponse = await axios.get(
          `http://localhost:8000/api/v1/course/${courseId}`,
          {
            withCredentials: true,
          }
        );

        // Assuming course details are available in courseDetailsResponse.data.result
        return courseDetailsResponse.data.result;
      })
    );

    res.status(200).json({
      success: true,
      enrolledCourses: coursesData,
    });
  } catch (err) {
    next(err);
  }
};
