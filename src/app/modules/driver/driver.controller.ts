import { Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";
import sendResponse from "../../utils/sendResponce";
import { DriverServices } from "./driver.service";

const acceptRide = CatchAsync(async (req: Request, res: Response) => {
  const driverId = (req.user as JwtPayload).userId;
  console.log(driverId, "dcon-10");
  const rideId = req.params.id;
  console.log("rideId", "dcon-11");
  const ride = await DriverServices.acceptRide(req.body, driverId, rideId);
  console.log(ride, "dcon-13");
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: "Driver accept a ride successfully",
    data: ride,
  });
});

export const DriverController = {
  acceptRide,
};
