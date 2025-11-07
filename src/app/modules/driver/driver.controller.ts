import { Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";
import sendResponse from "../../utils/sendResponce";
import { DriverServices } from "./driver.service";
import { RideStatus } from "../ride/ride.initerface";

const acceptRide = CatchAsync(async (req: Request, res: Response) => {
  const driverId = (req.user as JwtPayload).userId;
  console.log(driverId, "dcon-10");
  const rideId = req.params.id;
  console.log("rideId", "dcon-11");
  const ride = await DriverServices.acceptRide(driverId, rideId);
  console.log(ride, "dcon-13");
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: "Driver accept a ride successfully",
    data: ride,
  });
});

// driver cancel ride
// const cancelRide = CatchAsync(async (req: Request, res: Response) => {
//   const driverId = (req.user as JwtPayload).userId;
//   const riderId = (req.user as JwtPayload).userId;
//   console.log(driverId, "jfld");
//   const rideId = req.params.id;
//   const ride = await DriverServices.cancelRide(rideId, driverId, riderId);
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Driver cancel a ride",
//     data: ride,
//   });
// });
const cancelRide = CatchAsync(async (req: Request, res: Response) => {
  const driverId = (req.user as JwtPayload).userId; // ✅ driverId only
  const rideId = req.params.id;

  const ride = await DriverServices.cancelRide(rideId, driverId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Driver cancelled a ride",
    data: ride,
  });
});

// driver update status
const updateStatus = CatchAsync(async (req: Request, res: Response) => {
  const driverId = (req.user as JwtPayload).userId;
  const rideId = req.params.id;
  console.log(rideId, "midffd");
  const { status } = req.body;
  const rides = await DriverServices.updateStatus(
    driverId,
    rideId,
    status as RideStatus
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Driver update status",
    data: rides,
  });
});

// driver view earnings

const viewEarnings = CatchAsync(async (req: Request, res: Response) => {
  const driverId = (req.user as JwtPayload).userId;
  console.log(driverId, "dlfdj");
  const earnings = await DriverServices.viewEarnings(driverId);
  console.log(earnings, "lllll");
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Driver earnings retrieved successfully",
    data: { earnings: earnings },
  });
});

const getDriverProfile = async (req: Request, res: Response) => {
  try {
    const driverId = req.params.id;
    const driver = await DriverServices.getDriverProfileService(driverId);

    res.status(200).json({
      message: "Driver profile fetched successfully",
      driver,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Driver set availityStatus
const setAvailability = CatchAsync(async (req: Request, res: Response) => {
  const driverId = (req.user as JwtPayload).userId;
  const { availabilityStatus } = req.body;
  const driver = await DriverServices.setAvailability(
    driverId,
    availabilityStatus
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: " Driver can set availability easily",
    data: driver,
  });
});

const completeRide = CatchAsync(async (req: Request, res: Response) => {
  const driverId = (req.user as JwtPayload).userId;
  const rideId = req.params.id;
  console.log(rideId, "midffd");

  const rides = await DriverServices.completeRideService(driverId, rideId);

  res.status(200).json({
    message: "Ride completed successfully",
    rides,
  });
});

const requestForApprove = CatchAsync(async (req: Request, res: Response) => {
  const driverId = (req.user as JwtPayload).userId;
  const result = await DriverServices.requestForApprove(driverId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Driver request admin for approve",
    data: result,
  });
});

export const DriverController = {
  acceptRide,
  updateStatus,
  cancelRide,
  setAvailability,
  getDriverProfile,
  completeRide,
  requestForApprove,
  viewEarnings,
};
