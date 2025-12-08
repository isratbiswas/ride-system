import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.service";
import httpStatus from "http-status-codes";
import { CatchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/sendResponce";
import { setAuthCookie } from "../../utils/setCookies";

const credentialsLogin = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body);
    console.log(loginInfo);
    setAuthCookie(res, { accessToken: loginInfo.accessToken });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged in Successfully",
      data: loginInfo,
    });
  }
);

const logout = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("logout");
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log("logout1");
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Your logout successfully",
      data: null,
    });
  }
);
export const AuthControllers = {
  credentialsLogin,
  logout,
};
