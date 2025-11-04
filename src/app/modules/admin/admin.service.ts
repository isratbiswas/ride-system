import { ObjectId } from "mongoose";
import AppError from "../../errorHelpers/AppError";
import { Driver } from "../driver/driver.model";
import { DriverStatus } from "../driver/driver.interface";
import { IsActive } from "../user/user.interface";

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
const blockDriver = async (driverId: string) => {
  const driver = await Driver.findOne({ driverId });
  if (!driver) {
    throw new AppError(400, "Driver not found");
  }
  if (driver.isActive === "BLOCKED") {
    throw new Error("Driver already blocked");
  }
  if (driver.isActive === "INACTIVE") {
    throw new Error("Driver already INACTIVE");
  }
  if (driver.isActive === "ACTIVE") {
    throw new Error("Driver already ACTIVE");
  }
  driver.isActive = IsActive.BLOCKED;
  await driver.save();
  return driver;
};

export const AdminService = {
  getPendingDrivers,
  approveDriver,
  rejectDriver,
  blockDriver,
};
