import { totp } from "otplib";

// OTP Length
totp.options = {
  digits: 6,
  algorithm: "sha256",
  step: 30,
  window: 1,
  epoch: Date.now(),
};

const generateOTP = () => {
  const token = totp.generate(process.env.OTP_SECRET);
  return token;
};

const varifyOTP = (otp) => {
  return totp.check(otp, process.env.OTP_SECRET);
};

export default generateOTP;
