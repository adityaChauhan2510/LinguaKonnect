import jwt from "jsonwebtoken";

export const sendCookie = (person, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: person._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //one-day-in millisecond
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
