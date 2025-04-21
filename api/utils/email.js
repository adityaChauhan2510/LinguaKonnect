import nodemailer from "nodemailer";

export const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"LinguaKonnect Platform👻" <${process.env.EMAIL_USER}>`,
      to: `${email}`,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It expires in 5 minutes.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Message sent on mail");
    return info;
  } catch (err) {
    console.error("❌ Email sending failed:", err.message || err);
    throw new Error(`Failed to send OTP email: ${err.message || err}`);
  }
};

export const processEnrollment = async (
  tutor_email,
  course_name,
  student_name
) => {
  console.log("Trying to send enrollment mail...");
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"LinguaKonnect Platform👻" <${process.env.EMAIL_USER}>`,
      to: `${tutor_email}`,
      subject: `Course Purchased`,
      text: `Congratulations ${student_name} purchased your course ${course_name}`,
    });

    console.log("✅ Message sent on mail");
    return info;
  } catch (err) {
    console.error("❌ Email sending failed:", err.message || err);
    throw new Error(`Failed to send OTP email: ${err.message || err}`);
  }
};

export const processDoubt = async (
  tutor_email,
  course_name,
  student_name,
  student_email,
  doubt
) => {
  console.log("Trying to send doubt email...");

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `${student_name}👻 <${student_email}>`,
      to: `${tutor_email}`,
      subject: `${student_name} has a doubt regarding ${course_name} course`,
      text: `Student Email: ${student_email}\n \nDoubt: \n ${doubt}`,
    });

    console.log("✅ Message sent on mail");
    return info;
  } catch (err) {
    console.error("❌ Email sending failed:", err.message || err);
    throw new Error(`Failed to send OTP email: ${err.message || err}`);
  }
};
