import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.service";
import httpStatus from "http-status-codes";
import { CatchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/sendResponce";

const credentialsLogin = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body);
    console.log(loginInfo);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged in Successfully",
      data: loginInfo,
    });
  }
);

export const AuthControllers = {
  credentialsLogin,
};
