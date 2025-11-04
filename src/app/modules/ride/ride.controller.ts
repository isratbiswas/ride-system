import { Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync";
import { RideServices } from "./ride.service";
import httpStatus from "http-status-codes";
import sendResponse from "../../utils/sendResponce";
import { Role } from "../user/user.interface";
import { JwtPayload } from "jsonwebtoken";

const requestSendByRider = CatchAsync(async (req: Request, res: Response) => {
  const riderId = (req.user as JwtPayload).userId;
  const ride = await RideServices.requestSendByRider(req.body, riderId);
  console.log(ride, "vira");
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Rider send request for ride",
    data: ride,
  });
});

const cancelRequestByRider = CatchAsync(async (req: Request, res: Response) => {
  const rider = req.user as JwtPayload;
  const rideId = req.params.id;
  const ride = await RideServices.cancelRequestByRider(rider.userId, rideId);
  console.log(ride, "cont-26");
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Ride Cancel Successfully",
    data: ride,
  });
});

const getMyRides = CatchAsync(async (req: Request, res: Response) => {
  const rider = req.user as JwtPayload;
  const rides = await RideServices.getMyRides(rider.userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My Ride Retrieved Successfully",
    data: rides,
  });
});

const completedRide = CatchAsync(async (req: Request, res: Response) => {
  const rideId = req.params.id;
  const driverId = (req.user as JwtPayload).userId;
  const ride = await RideServices.completedRide(rideId, driverId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Ride completed successfully",
    data: ride,
  });
});

export const RideController = {
  requestSendByRider,
  cancelRequestByRider,
  getMyRides,
  completedRide,
};
