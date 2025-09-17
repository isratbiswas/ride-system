import AppError from "../../errorHelpers/AppError";
import { RideStatus } from "../ride/ride.initerface";
import { Ride } from "../ride/ride.model";
import { AvailabilityStatus } from "../user/user.interface";
import { User } from "../user/user.model";
import { IDriver } from "./driver.interface";
import { Driver } from "./driver.model";

// const acceptRide = async (
//   payload: Partial<IDriver>,
//   driverId: string,
//   rideId: string
// ) => {
//   console.log(driverId, rideId, "dser-10");

//   const createDriver = await Driver.create({
//     driverId: driverId,
//     status: "accepted",
//     ...payload,
//   });

//   const ride = await Ride.findByIdAndUpdate(
//     rideId,
//     {
//       driverId: driverId,
//     },
//     { new: true }
//   );
//   console.log(ride, "dser-11");
//   if (!ride) {
//     throw new AppError(400, "Ride Not Found");
//   }
//   if (ride.status !== RideStatus.requested) {
//     throw new AppError(401, "Ride already taken");
//   }
//   ride.status = RideStatus.accepted;
//   ride.history.push({
//     status: RideStatus.accepted,
//     at: new Date(),
//     by: driverId,
//   });
//   await ride.save();
//   return {
//     ride,
//     createDriver,
//   };
// };

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
  ride.history.push({
    status: RideStatus.accepted,
    at: new Date(),
    by: driverId,
  });
  await ride.save();
  return ride;
};

// Driver reject ride
const cancelRide = async (rideId: string, driverId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new AppError(404, "Ride not found");

  // Only rides that are still "requested" can be cancelled
  if (ride.status !== RideStatus.requested) {
    throw new AppError(400, "Ride already processed");
  }

  ride.status = RideStatus.cancelled;
  ride.history.push({
    status: RideStatus.cancelled,
    at: new Date(),
    by: driverId,
  });

  await ride.save({ validateBeforeSave: false });
  return ride;
};

const updateStatus = async (
  driverId: string,
  rideId: string,
  status: RideStatus
) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error("Ride not found");
  if (!ride.driverId?.equals(driverId))
    throw new AppError(403, "Not authorized to update this ride");
  ride.status = status;
  ride.history.push({
    status,
    at: new Date(),
    by: driverId,
  });
  if (status === RideStatus.in_transit) {
    await Ride.findByIdAndUpdate(driverId);
  }

  await ride.save();
  return ride;
};

// view earnings
// const viewEarnings = async (driverId: string) => {
//   // Find driver with earnings populated
//   console.log(driverId, "ddddd");
//   const driver = await User.findOne({ _id: driverId, role: "driver" }).populate(
//     "earnings.ride"
//   );
//   console.log(driver, "rrrrr");
//   if (!driver) {
//     throw new AppError(404, "Driver not found");
//   }

//   return driver.earnings;
// };

//  Driver set Availability
const setAvailability = async (
  driverId: string,
  availabilityStatus: AvailabilityStatus
) => {
  const updateDriver = await User.findOneAndUpdate(
    { _id: driverId },
    { availabilityStatus },
    { new: true }
  );

  return updateDriver;
};
export const DriverServices = {
  acceptRide,
  cancelRide,
  updateStatus,
  setAvailability,
};
