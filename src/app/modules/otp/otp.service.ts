// import crypto from "crypto";
// import { User } from "../user/user.model";
// import AppError from "../../errorHelpers/AppError";
// const OTP_EXPIRATION = 2 * 60; // 2minute
// const generateOtp = async (length = 6) => {
//   const otp = crypto.randomInt(10 ** (length - 1, 10 ** length).toString());
//   return otp;
// };
// const sendOTP = async (email: string, name: string) => {
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new AppError(404, "User not found");
//   }

//   if (user.isVerified) {
//     throw new AppError(401, "You are already verified");
//   }
//   const otp = generateOtp();
//   const radisKey = `otp:${email}`;
//   await redisClient.set(redisKey, otp, {
//     expiration: {
//       type: "EX",
//       value: OTP_EXPIRATION,
//     },
//   });
// };
// const verifyOTP = async () => {};

// export const OtpService = {
//   sendOTP,
//   verifyOTP,
// };
