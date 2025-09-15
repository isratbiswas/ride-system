import { Document, Schema, Types } from "mongoose";

export type TRideStatus =
  | "requested"
  | "accepted"
  | "rejected"
  | "picked_up"
  | "in_transit"
  | "completed"
  | "cancelled";

export interface IRide extends Document {
  rider: Types.ObjectId;
  driver?: Types.ObjectId | null;
  pickup: {
    address: string;
    coords?: { lat: number; lng: number };
  };
  destination: {
    address: string;
    coords?: { lat: number; lng: number };
  };
  status: TRideStatus;
  statusHistory: {
    status: TRideStatus;
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
