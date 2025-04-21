import { User } from "../model/user.js";
import bcrypt from "bcryptjs";
import { randomInt } from "crypto";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middleware/error.js";
import { getRedisClient } from "../db/database.js";
import { sendOTPEmail } from "../utils/email.js";
import { Tutor } from "../model/tutor.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");
    let role = "user";

    if (!user) {
      user = await Tutor.findOne({ email }).select("+password");
      role = "tutor";
    }

    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid Password", 400));
    }

    sendCookie(user, res, `Welcome back, ${user.name}`, 200, { role });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    let tutor = await Tutor.findOne({ email });
    if (user || tutor) return next(new ErrorHandler("User Already Exist", 400));

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
    const { name, email, password, otp } = req.body;
    const redisClient = getRedisClient();

    // Get OTP from Redis
    const storedOTP = await redisClient.get(`otp:${email}`);
    if (!storedOTP || storedOTP !== otp) {
      return next(new ErrorHandler("Invalid or expired OTP", 400));
    }

    // Delete OTP from Redis after verification
    await redisClient.del(`otp:${email}`);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, `Welcome, ${user.name}`, 201);
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

    let user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

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

export const getEnrolledCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("courses.courseId");
    res.status(200).json({
      message: "Your purchases",
      success: true,
      enrolledCourses: user.courses,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
