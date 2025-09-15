import AppError from "../../errorHelpers/AppError";
import { Ride } from "./ride.model";

const requestSendByRider = async (
  riderId: string,
  pickup: any,
  destination: any,
  estimateFare: number
) => {
  const requesteRide = await Ride.create({
    rider: riderId,
    pickup,
    destination,
    status: "requested",
    statusHistory: [{ status: "requested", at: new Date(), by: riderId }],
    fare: estimateFare || 0,
  });
  console.log(requesteRide, "israt");
  return requesteRide;
};

const cancelRequestByRider = async (
  riderId: string,
  userId: string,
  isAdmin: boolean
) => {
  const ride = await Ride.findById(riderId);
  if (!ride) {
    throw new Error("Ride not Found");
  }
  if (!ride.rider.equals(userId) && !isAdmin) {
    throw new Error("Not Allowed");
  }
  if (ride.status !== "requested") {
    throw new Error("cannot cancel after accepted");
  }
  ride.status = "cancelled";
  ride.statusHistory.push({ status: "cancelled", at: new Date(), by: riderId });
  await ride.save();
  return ride;
};

export const RideServices = {
  requestSendByRider,
  cancelRequestByRider,
};
