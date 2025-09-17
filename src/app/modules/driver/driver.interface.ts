import { Schema } from "mongoose";
import { Types } from "mongoose";

export interface IDriver {
  driverId: Types.ObjectId;

  vehicle?: {
    make?: string;
    model?: string;
    plate?: string;
  };
  approved: boolean;
  currentRideId: string | null;
  earnings?: { amount: number; at: Date; ride: Types.ObjectId }[];
}
