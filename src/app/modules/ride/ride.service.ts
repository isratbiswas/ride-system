import { Types } from "mongoose";
import AppError from "../../errorHelpers/AppError";
import { Ride } from "./ride.model";
import { IRide, RideStatus } from "./ride.initerface";

const requestSendByRider = async (payload: Partial<IRide>, riderId: string) => {
  const requesteRide = await Ride.create({
    riderId: riderId,
    status: "requested",
    ...payload,
  });

  return requesteRide;
};

const cancelRequestByRider = async (userId: string, rideId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new Error("Ride not Found");
  }
  if (!ride.riderId.equals(userId)) {
    throw new Error("Not Allowed");
  }
  if (ride.status === RideStatus.cancelled) {
    throw new Error("Ride already cancelled");
  }

  ride.status = RideStatus.cancelled;
  ride.statusHistory.push({
    status: RideStatus.cancelled,
    at: new Date(),
    by: userId,
  });
  await ride.save();
  return ride;
};

export const RideServices = {
  requestSendByRider,
  cancelRequestByRider,
};
