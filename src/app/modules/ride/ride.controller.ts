import { Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync";
import { RideServices } from "./ride.service";
import httpStatus from "http-status-codes";
import sendResponse from "../../utils/sendResponce";
import { Role } from "../user/user.interface";

const requestSendByRider = CatchAsync(async (req: Request, res: Response) => {
  const rider = req.user as { userId: string };
  if (!rider?.userId) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: "Unauthorized: rider not found",
      data: rider,
    });
  }

  const { pickup, destination, estimateFare } = req.body;
  const ride = await RideServices.requestSendByRider(
    rider.userId,
    pickup,
    destination,
    estimateFare
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Rider send request for ride",
    data: ride,
  });
});

const cancelRequestByRider = CatchAsync(async (req: Request, res: Response) => {
  const rider = req.user as { userId: string };
  const riderId = req.params.id;
  const ride = await RideServices.cancelRequestByRider(
    userId,
    riderId,
    Role === "RiDER"
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Ride Cancel Successfully",
    data: ride,
  });
});

export const RideController = {
  requestSendByRider,
  cancelRequestByRider,
};
