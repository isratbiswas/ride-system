import { ObjectId } from "mongoose";
import AppError from "../../errorHelpers/AppError";
import { Driver } from "../driver/driver.model";
import { DriverStatus } from "../driver/driver.interface";
import { IsActive } from "../user/user.interface";
import { User } from "../user/user.model";

const getPendingDrivers = async () => {
  const pendingDrivers = await Driver.find({
    requestStatus: "pending",
  }).populate("driverId", "name email");
  return pendingDrivers;
};

const approveDriver = async (driverId: string) => {
  console.log(driverId, "nagib");
  const driver = await Driver.findOne({ driverId });
  console.log(driver, "israt");
  if (!driver) {
    throw new AppError(400, "Driver not found");
  }
  if (driver.requestStatus === "approved") {
    throw new Error("Driver already approved");
  }
  if (driver.requestStatus === "rejected") {
    throw new Error("Driver already rejected");
  }
  driver.requestStatus = DriverStatus.approved;
  await driver.save();
  return driver;
};

const rejectDriver = async (driverId: string) => {
  const driver = await Driver.findOne({ driverId });
  if (!driver) {
    throw new AppError(400, "Driver not found");
  }
  if (driver.requestStatus === "rejected") {
    throw new Error("Driver already rejected");
  }
  if (driver.requestStatus === "approved") {
    throw new Error("Driver already approved");
  }
  driver.requestStatus = DriverStatus.rejected;
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
  if (user.isActive === "BLOCKED") {
    throw new Error("Driver already blocked");
  }

  user.isActive = IsActive.BLOCKED;
  await user.save();
  return user;
};

export const AdminService = {
  getPendingDrivers,
  approveDriver,
  rejectDriver,
  blockUser,
};
