import { Document, Schema, Types } from "mongoose";

export enum RideStatus {
  requested = "requested",
  accepted = "accepted",
  cancelled = "cancelled",
}
// |
// |
// | "rejected"
// | "picked_up"
// | "in_transit"
// | "completed"
// |

export interface IRide extends Document {
  riderId: Types.ObjectId;
  driverId?: Types.ObjectId | null;
  pickup: {
    address: string;
    coords?: { lat: number; lng: number };
  };
  destination: {
    address: string;
    coords?: { lat: number; lng: number };
  };
  status: RideStatus;
  statusHistory: {
    status: RideStatus;
    at: Date;
    by?: Schema.Types.ObjectId | string | null;
  }[];
  fare: number;
  driverPayout?: number;
  createdAt: Date;
  updatedAt: Date;
}

export const statusEntrySchema = new Schema(
  {
    status: { type: String, required: true },
    at: { type: Date, default: Date.now },
    by: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { _id: false }
);
