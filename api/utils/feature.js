import jwt from "jsonwebtoken";

export const sendCookie = (
  person,
  res,
  message,
  statusCode = 200,
  extraData = {}
) => {
  const token = jwt.sign({ _id: person._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message,
      token,
      ...extraData, // Include any extra data such as role
    });
};
