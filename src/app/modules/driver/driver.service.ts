import AppError from "../../errorHelpers/AppError";
import { RideStatus } from "../ride/ride.initerface";
import { Ride } from "../ride/ride.model";
import { User } from "../user/user.model";
import { AvailabilityStatus, DriverStatus, IDriver } from "./driver.interface";
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
  // payload: Partial<IDriver>,
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

// services/driver.service.ts

const getDriverProfileService = async (driverId: string) => {
  const driver = await Ride.find({ driverId });

  if (!driver) throw new AppError(400, "Driver not found");
  const totalRides = await Ride.countDocuments();
  console.log(driver, "serv-43");
  return {
    driver,
    meta: {
      total: totalRides,
    },
  };

  return driver;
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

const completeRideService = async (
  driverId: string,
  rideId: string,
  status: RideStatus
) => {
  // 1️⃣ Find ride
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error("Ride not found");

  // 2️⃣ Mark ride as completed
  ride.status = RideStatus.completed;
  await ride.save();

  // 3️⃣ Check/create driver in Driver collection
  let driver = await Ride.findOne({ user: ride.driverId });

  if (!driver) {
    throw new AppError(401, "driver not found");
  }

  // 4️⃣ Add ride info to driver's completedRides
  // driver.complatedRides.push({
  //   ride: ride._id as string,
  //   fare: ride.fare,
  //   completedAt: new Date(),
  // });

  // driver.earnings += ride.fare;
  // await driver.save();

  return ride;
};

//  Driver set Availability
const setAvailability = async (
  driverId: string,
  availabilityStatus: AvailabilityStatus
) => {
  const updateDriver = await Driver.findOneAndUpdate(
    { _id: driverId },
    { availabilityStatus },
    { new: true }
  );

  return updateDriver;
};

// driver request for approve
const requestForApprove = async (driverId: string) => {
  const driver = await Driver.findOne({ driverId });
  if (!driver) {
    throw new AppError(401, "Driver not Found");
  }
  if (driver.requestStatus === "pending") {
    throw new AppError(400, "Request already sent");
  }
  driver.requestStatus = DriverStatus.pending;
  await driver.save();
  return { driver, message: "Approval request sent to admin" };
};
export const DriverServices = {
  acceptRide,
  cancelRide,
  updateStatus,
  setAvailability,
  getDriverProfileService,
  completeRideService,
  requestForApprove,
};
