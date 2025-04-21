import { Tutor } from "../model/tutor.js";
import { User } from "../model/user.js";
import { randomInt } from "crypto";
import { getRedisClient } from "../db/database.js";
import { sendOTPEmail } from "../utils/email.js";
import bcrypt from "bcryptjs";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middleware/error.js";

//this login is not used now. See user login
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
    let user = await User.findOne({ email });
    if (tutor || user)
      return next(new ErrorHandler("Tutor Already Exist", 400));

    // Generate OTP
    const otp = randomInt(100000, 999999).toString();
    const redisClient = getRedisClient();
    await redisClient.setEx(`otp:${email}`, 300, otp); // Store OTP for 5 mins

    try {
      await sendOTPEmail(email, otp);
    } catch (emailError) {
      //Delete OTP from Redis if email sending fails
      await redisClient.del(`otp:${email}`);
      return next(
        new ErrorHandler("Failed to send OTP. Try again later.", 500)
      );
    }

    res.status(200).json({
      success: true,
      message:
        "OTP sent to your email. Please verify to complete registration.",
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { name, email, experience, password, otp } = req.body;
    const redisClient = getRedisClient();

    // Get OTP from Redis
    const storedOTP = await redisClient.get(`otp:${email}`);
    if (!storedOTP || storedOTP !== otp) {
      return next(new ErrorHandler("Invalid or expired OTP", 400));
    }

    // Delete OTP from Redis after verification
    await redisClient.del(`otp:${email}`);

    const hashedPassword = await bcrypt.hash(password, 10);
    const tutor = await Tutor.create({
      name,
      email,
      experience,
      password: hashedPassword,
    });

    sendCookie(tutor, res, `Welcome, ${tutor.name}`, 201);
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
