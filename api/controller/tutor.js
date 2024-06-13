import { Tutor } from "../model/tutor.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middleware/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const tutor = await Tutor.findOne({ email }).select("+password");
    if (!tutor) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, tutor.password);
    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(tutor, res, `Welcome back, ${tutor.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, experience, password } = req.body;

    let tutor = await Tutor.findOne({ email });

    if (tutor) return next(new ErrorHandler("Tutor Already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    tutor = await Tutor.create({
      name,
      email,
      experience,
      password: hashedPassword,
    });

    sendCookie(tutor, res, `Welcome , ${tutor.name}`, 200);
  } catch (error) {
    next(error);
  }
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

export const myCourses = async (req, res, next) => {
  try {
    const tutorId = req.tutor._id;
    const tutor = await Tutor.findById(tutorId).populate("courses");

    if (!tutor) {
      return next(new ErrorHandler("Tutor not found", 404));
    }

    res.status(200).json({
      success: true,
      takingCourses: tutor.courses,
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Tutor.findById(id);
    if (!data) return next(new ErrorHandler("Tutor doesn't Exist", 400));
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
    user: req.tutor,
  });
};
