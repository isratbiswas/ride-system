import { ObjectId, Types } from "mongoose";
import AppError from "../../errorHelpers/AppError";
import { Ride } from "./ride.model";
import { IRide, RideStatus } from "./ride.initerface";
import { Driver } from "../driver/driver.model";

// Rider request a ride
const requestSendByRider = async (payload: Partial<IRide>, riderId: string) => {
  const requesteRide = await Ride.create({
    riderId: riderId,
    status: "requested",
    ...payload,
  });

  return requesteRide;
};

//  Rider  cancel a ride
const cancelRequestByRider = async (userId: string, rideId: string) => {
  console.log(rideId, "can-2");
  const ride = await Ride.findById(rideId);
  console.log(ride, "cna-1");
  if (!ride) {
    throw new Error("Ride not Found");
  }
  if (!ride.riderId.equals(userId)) {
    throw new Error("Not Allowed");
  }
  if (ride.status === RideStatus.cancelled) {
    throw new Error("Ride already cancelled");
  }
  // Important extra validations
  if (ride.status === RideStatus.in_transit) {
    throw new Error("Cannot cancel an ongoing ride");
  }
  if (ride.status === RideStatus.completed) {
    throw new Error("Ride already completed");
  }
  ride.status = RideStatus.cancelled;
  ride.history.push({
    status: RideStatus.cancelled,
    at: new Date(),
    by: userId,
  });
  await ride.save();
  return ride;
};

// Rider get all rider herself

const getMyRides = async (riderId: string | ObjectId) => {
  const rides = await Ride.find({ riderId }).populate("driverId", "name email");
  const totalRides = await Ride.countDocuments({ riderId });
  return {
    rides,
    meta: {
      total: totalRides,
    },
  };
};

export const RideServices = {
  requestSendByRider,
  cancelRequestByRider,
  getMyRides,
};
