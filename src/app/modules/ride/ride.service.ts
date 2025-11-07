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
  const totalRides = await Ride.countDocuments();
  console.log(rides, "serv-43");
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
