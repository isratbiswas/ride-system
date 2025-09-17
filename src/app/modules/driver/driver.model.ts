import { model, Schema } from "mongoose";
import { IDriver } from "./driver.interface";

const driverSchema = new Schema<IDriver>({
  driverId: { type: Schema.Types.ObjectId, required: true },

  approved: { type: Boolean, ref: "User" },
  vehicle: {
    make: String,
    model: String,
    plate: String,
  },
  currentRideId: { type: Schema.Types.ObjectId, ref: "Ride", default: null },
  earnings: [
    {
      amount: { type: Number, required: true },
      at: { type: Date, default: Date },
      ride: { type: Schema.Types.ObjectId, ref: "Ride" },
    },
  ],
});

export const Driver = model<IDriver>("Driver", driverSchema);
