import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import { UserServices } from "./user.service";
import httpStatus from "http-status-codes";
import { CatchAsync } from "../../utils/CatchAsync";
// import { sendResponse } from "../../utils/sendResponce";
import sendResponse from "../../utils/sendResponce";
import { JwtPayload } from "jsonwebtoken";

const createUser = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User created successfully",
      data: user,
    });
  }
);

const updateUser = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const verifiedToken = req.user;
    const payload = req.body;
    const user = await UserServices.updateUser(userId, payload, verifiedToken);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User updated successfully",
      data: user,
    });
  }
);

const getme = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const result = await UserServices.getme(decodedToken.userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User retrived successfully",
      data: result.data,
    });
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const getAllUsers = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Users Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

export const UserControllers = {
  createUser,
  updateUser,
  getAllUsers,
  getme,
};
