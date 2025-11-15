import { ObjectId } from "mongoose";
import AppError from "../../errorHelpers/AppError";
import { Driver } from "../driver/driver.model";
import { DriverStatus } from "../driver/driver.interface";
import { IsActive } from "../user/user.interface";
import { User } from "../user/user.model";
import { Ride } from "../ride/ride.model";

const getPendingDrivers = async () => {
  const pendingDrivers = await Driver.find({
    requestStatus: "pending",
  }).populate("driverId", "name email");
  return pendingDrivers;
};

const approveDriver = async (driverId: string) => {
  const driver = await Driver.findById(driverId);

  if (!driver) {
    throw new AppError(400, "Driver not found");
  }
  if (driver.requestStatus === "approved") {
    throw new Error("Driver already approved");
  }
  if (driver.requestStatus === "suspend") {
    throw new Error("Driver already rejected");
  }
  driver.requestStatus = DriverStatus.approved;
  await driver.save();
  return driver;
};

const suspendDriver = async (driverId: string) => {
  console.log(driverId, "nagib");
  const driver = await Driver.findById(driverId);
  console.log(driver, "israt");
  if (!driver) {
    throw new AppError(400, "Driver not found");
  }
  if (driver.requestStatus === "suspend") {
    throw new Error("Driver already rejected");
  }

  driver.requestStatus = DriverStatus.suspend;
  await driver.save();
  return driver;
};
const blockUser = async (userId: string) => {
  console.log(userId, "user");
  const user = await User.findById(userId);
  console.log(user, "ser-50");
  if (!user) {
    throw new AppError(400, "user not found");
  }
  user.isActive = IsActive.BLOCKED;
  await user.save();
  return user;
};
const unblockUser = async (userId: string) => {
  console.log(userId, "userUN");
  const user = await User.findById(userId);
  console.log(user, "ser-50");
  if (!user) {
    throw new AppError(400, "user not found");
  }

  user.isActive = IsActive.UNBLOCKED;
  await user.save();
  return user;
};

const analyticsOverview = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const ridesAgg = await Ride.aggregate([
    { $match: { createdAt: { $gte: thirtyDaysAgo }, status: "completed" } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
        revenue: { $sum: "$fare" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return ridesAgg;
};

const getTotalRevenue = async () => {
  const totalRevenue = await Ride.aggregate([
    { $match: { status: "completed" } },
    {
      $group: {
        _id: null,
        revenue: { $sum: "$fare" },
        rides: { $sum: 1 },
      },
    },
  ]);

  return totalRevenue[0] || { revenue: 0, rides: 0 };
};

const getTopDrivers = async (limit = 5) => {
  const topDrivers = await Ride.aggregate([
    { $match: { driver: { $ne: null }, status: "completed" } },

    // Group by driver ID
    {
      $group: {
        _id: "$driver",
        rides: { $sum: 1 },
        revenue: { $sum: "$fare" },
      },
    },

    // Sort by number of rides
    { $sort: { rides: -1 } },

    // Limit to top N drivers
    { $limit: limit },

    // Lookup driver details from User collection
    {
      $lookup: {
        from: "users", // MongoDB collection name (make sure it matches)
        localField: "_id",
        foreignField: "_id",
        as: "driverInfo",
      },
    },

    // Unwind the array to get single object
    { $unwind: "$driverInfo" },

    // Project required fields
    {
      $project: {
        _id: 0,
        driverId: "$_id",
        name: "$driverInfo.name",
        email: "$driverInfo.email",
        rides: 1,
        revenue: 1,
      },
    },
  ]);

  return topDrivers;
};

export const AdminService = {
  getPendingDrivers,
  approveDriver,
  unblockUser,
  suspendDriver,
  blockUser,
  analyticsOverview,
  getTotalRevenue,
  getTopDrivers,
};
