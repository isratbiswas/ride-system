import { Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/sendResponce";
import { AdminService } from "./admin.service";
import { JwtPayload } from "jsonwebtoken";
import { DriverServices } from "../driver/driver.service";

const getPendingDrivers = CatchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getPendingDrivers();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Get all pending drivers",
    data: result,
  });
});

const approveDriver = CatchAsync(async (req: Request, res: Response) => {
  const driverId = req.params.id;
  console.log(driverId, "con-20");
  const result = await AdminService.approveDriver(driverId);
  console.log(driverId, "con-21");
  console.log(result, "con-23");

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Get all pending drivers",
    data: result,
  });
});
const rejectDriver = CatchAsync(async (req: Request, res: Response) => {
  const driverId = req.params.id;
  const result = await AdminService.rejectDriver(driverId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Reject drivers approve",
    data: result,
  });
});

const blockUser = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  console.log(userId, "con-44");

  const result = await AdminService.blockUser(userId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Block driver successfully",
    data: result,
  });
});

export const AdminController = {
  getPendingDrivers,
  approveDriver,
  rejectDriver,
  blockUser,
};
