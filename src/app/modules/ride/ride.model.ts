import { model, Schema } from "mongoose";
import { IRide, statusEntrySchema } from "./ride.initerface";

const rideSchema = new Schema<IRide>(
  {
    rider: { type: Schema.Types.ObjectId, ref: "User", required: true },
    driver: { type: Schema.Types.ObjectId, ref: "User", default: null },
    pickup: {
      address: String,
      coords: {
        lat: Number,
        lng: Number,
      },
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
      required: true,
    },
    statusHistory: { type: [statusEntrySchema], default: [] },
    fare: { type: Number, default: 0 },
    driverPayout: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Ride = model<IRide>("Ride", rideSchema);
