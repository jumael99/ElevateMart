import nodemailer from "nodemailer";
import emailTemplate from "./emailTemplate.js";

const createTransporter = () => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  return transport;
};

const sendOTPEmail = async (email, otp, hashedEmail) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "OTP for email verification",
    html: emailTemplate(email, otp),
  };

  await transporter.sendMail(mailOptions);
};

export default sendOTPEmail;
