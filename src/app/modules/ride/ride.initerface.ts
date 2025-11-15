import { Document, ObjectId, Schema, Types } from "mongoose";

export enum RideStatus {
  requested = "requested",
  accepted = "accepted",
  cancelled = "cancelled",
  completed = "completed",
  picked_up = "picked_up",
  in_transit = "in_transit",
}

export interface IRideHistory {
  status: RideStatus;
  at: Date;
  by?: string | ObjectId | null; // riderId or driverId
}

export interface IRide extends Document {
  riderId: Types.ObjectId;
  name: string;
  email: string;
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
  history: IRideHistory[];
  fare: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date;
}

export const rideHistorySchema = new Schema(
  {
    status: { type: String, enum: Object.values(RideStatus), required: true },
    at: { type: Date, default: Date.now },
    by: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { _id: false }
);
