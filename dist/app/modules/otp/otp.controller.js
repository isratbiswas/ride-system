"use strict";
// import { Request, Response } from "express";
// import { CatchAsync } from "../../utils/CatchAsync";
// import sendResponse from "../../utils/sendResponce";
// import { OtpService } from "./otp.service";
// const sendOTP = CatchAsync(async (req: Request, res: Response) => {
//   const { email, name } = req.body;
//   await OtpService.sendOTP(email, name);
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "Otp sent successfully",
//     data: null,
//   });
// });
// const verifyOTP = CatchAsync(async (req: Request, res: Response) => {
//   const { email, otp } = req.body;
//   await OtpService.verifyOTP(email, otp);
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "Otp verified successfully",
//     data: null,
//   });
// });
// export const OTPController = {
//   sendOTP,
//   verifyOTP,
// };
