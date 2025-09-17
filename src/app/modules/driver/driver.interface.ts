import { Schema } from "mongoose";
import { Types } from "mongoose";

export enum AvailabilityStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export interface IDriver {
  driverId: Types.ObjectId;
  availabilityStatus: AvailabilityStatus;
  vehicle?: {
    make?: string;
    model?: string;
    plate?: string;
  };
   approved: boolean,
  currentRideId: string | null;
  earnings?: { amount: number; at: Date; ride: Types.ObjectId }[];
}
