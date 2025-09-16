import { Types } from "mongoose";

export interface IDriver {
  driverId: Types.ObjectId;
  approved: boolean;
  online: boolean;
  vehicle?: {
    make?: string;
    model?: string;
    plate?: string;
  };
  currentRideId: string | null;
  earning: number;
}
