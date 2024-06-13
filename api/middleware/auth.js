import { User } from "../model/user.js";
import { Tutor } from "../model/tutor.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Login First",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    if (!req.user) {
      req.tutor = await Tutor.findById(decoded._id);
    }

    if (!req.user && !req.tutor) {
      return res.status(404).json({
        success: false,
        message: "User or Tutor not found",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
