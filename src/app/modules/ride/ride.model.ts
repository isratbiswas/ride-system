import { model, Schema, Types } from "mongoose";
import { IRide, rideHistorySchema, RideStatus } from "./ride.initerface";

const completedRideSchema = new Schema({
  fare: { type: Number, required: true },
  ride: { type: Types.ObjectId, ref: "Ride", required: true },
  completedAt: { type: Date, default: Date.now },
});

const rideSchema = new Schema<IRide>(
  {
    riderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    driverId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    pickup: {
      address: String,
      coords: {
        lat: Number,
        lng: Number,
      },
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },

    destination: {
      address: String,
      coords: {
        lat: Number,
        lng: Number,
      },
    },
    status: {
      type: String,
      enum: Object.values(RideStatus),
      required: true,
    },
    history: {
      type: [rideHistorySchema],
      default: [],
    },
    fare: { type: Number, default: 0 },
    driverPayout: { type: Number, default: 0 },
    completedAt: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Ride = model<IRide>("Ride", rideSchema);
