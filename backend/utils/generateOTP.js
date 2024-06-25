import { otpGen } from "otp-gen-agent";

const generateOTP = async () => {
  const otp = await otpGen();
  return otp;
};

export default generateOTP;
