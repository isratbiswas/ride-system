import { model, Schema } from "mongoose";
import { IDriver } from "./driver.interface";

const driverSchema = new Schema<IDriver>({
  approved: { type: Boolean, default: false },
  online: { type: Boolean, default: false },
  vehicle: {
    make: String,
    model: String,
    plate: String,
  },
  currentRideId: { type: Schema.Types.ObjectId, ref: "Ride", default: null },
  earning: { type: Number, default: 0 },
});

export const Driver = model<IDriver>("Driver", driverSchema);
