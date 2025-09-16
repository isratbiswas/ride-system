import AppError from "../../errorHelpers/AppError";
import { RideStatus } from "../ride/ride.initerface";
import { Ride } from "../ride/ride.model";
import { IDriver } from "./driver.interface";

const acceptRide = async (
  payload: Partial<IDriver>,
  driverId: string,
  rideId: string
) => {
  console.log(driverId, rideId, "dser-10");
  const ride = await Ride.findByIdAndUpdate(
    rideId,
    {
      driverId: driverId,
    },
    { new: true }
  );
  console.log(ride, "dser-11");
  if (!ride) {
    throw new AppError(400, "Ride Not Found");
  }
  if (ride.status !== RideStatus.requested) {
    throw new AppError(401, "Ride already taken");
  }
  ride.status = RideStatus.accepted;
  ride.statusHistory.push({
    status: RideStatus.accepted,
    at: new Date(),
    by: driverId,
  });
  await ride.save();
  return ride;
};

export const DriverServices = {
  acceptRide,
};
