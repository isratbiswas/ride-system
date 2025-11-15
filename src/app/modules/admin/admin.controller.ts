import { NextFunction, Request, Response } from "express";
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

  const result = await AdminService.approveDriver(driverId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Get all pending drivers",
    data: result,
  });
});
const suspendDriver = CatchAsync(async (req: Request, res: Response) => {
  const driverId = req.params.id;
  console.log(driverId, "con-20");
  const result = await AdminService.suspendDriver(driverId);
  console.log(driverId, "con-21");
  console.log(result, "con-23");
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
    message: "Block rider successfully",
    data: result,
  });
});
const unblockUser = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  console.log(userId, "con-44er");
  const result = await AdminService.unblockUser(userId);
  console.log(result, "un");
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "unBlock rider successfully",
    data: result,
  });
});

const analyticsOverview = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const ridesAgg = await AdminService.analyticsOverview();
    const totalRevenue = await AdminService.getTotalRevenue();
    const topDrivers = await AdminService.getTopDrivers();
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Analytics overview fetched successfully",
      data: {
        ridesAgg,
        totalRevenue,
        topDrivers,
      },
    });
  }
);

export const AdminController = {
  getPendingDrivers,
  approveDriver,
  suspendDriver,
  blockUser,
  unblockUser,
  analyticsOverview,
};
