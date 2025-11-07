import { model, Schema, Types } from "mongoose";
import { AvailabilityStatus, DriverStatus, IDriver } from "./driver.interface";
import { IsActive } from "../user/user.interface";

const completedRideSchema = new Schema(
  {
    fare: { type: Number, required: true },
    ride: { type: Types.ObjectId, ref: "Ride", required: true },
    completedAt: { type: Date, default: Date.now },
  },
  {
    _id: false,
  }
);

const driverSchema = new Schema<IDriver>(
  {
    driverId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    riderId: { type: Schema.Types.ObjectId, ref: "Ride" },
    approve: { type: Boolean },
    name: { type: String },
    email: { type: String },
    vehicle: {
      make: String,
      model: String,
      plate: String,
    },
    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
    },
    availabilityStatus: {
      type: String,
      enum: Object.values(AvailabilityStatus),
      default: AvailabilityStatus.OFFLINE,
    },
    requestStatus: {
      type: String,
      enum: Object.values(DriverStatus),
      default: DriverStatus.none,
    },
    currentRideId: { type: Schema.Types.ObjectId, ref: "Ride", default: null },
    earnings: { type: Number, default: 0 },
    completedRides: { type: [completedRideSchema], default: [] },
  },
  { timestamps: true }
);

export const Driver = model<IDriver>("Driver", driverSchema);
