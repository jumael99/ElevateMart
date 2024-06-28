import OTP from "../models/otpModel.js";
import crypto from "crypto";

function generateSecureOTP() {
  const randomBuffer = crypto.randomBytes(4);
  const randomNumber = randomBuffer.readUInt32BE(0);
  const dateTimeNow = new Date().toISOString();
  const hash = crypto
    .createHash("sha256")
    .update(`${randomNumber}${dateTimeNow}`)
    .digest("hex");
  const otpPortion = hash.substring(0, 6);
  const otp = (parseInt(otpPortion, 16) % 900000) + 100000;
  return otp.toString().substring(0, 6);
}

const createOTP = async (email, otpFor) => {
  const otp = generateSecureOTP();
  console.log(otp);
  await OTP.create({
    otp,
    email,
    validTo: new Date(Date.now() + 5 * 60 * 1000),
    usedFor: otpFor,
  });
  return otp;
};

export default createOTP;
