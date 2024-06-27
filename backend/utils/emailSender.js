import nodemailer from "nodemailer";
import emailTemplate from "./emailTemplate.js";

// Transporter configuration gmail
// const createTransporter = () => {
//   const transport = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.GMAIL_USER,
//       pass: process.env.GMAIL_PASS,
//     },
//   });
//   return transport;
// };

// Transporter configuration mailtrap
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

// Send the OTP email
const sendOTPEmail = async (user, otp, verifyURL) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: "Welcome <system@elevatemart.com>",
    to: user.email,
    subject: "OTP for email verification",
    html: emailTemplate(user, otp, verifyURL),
  };

  await transporter.sendMail(mailOptions);
};

export default sendOTPEmail;
