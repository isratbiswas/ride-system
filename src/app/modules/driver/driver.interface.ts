import { Types } from "mongoose";
import { AvailabilityStatus, IsActive } from "../user/user.interface";
export interface ICompletedRide {
  fare: number;
  ride: Types.ObjectId | string; // Ride reference
  completedAt: Date;
}

export enum DriverStatus {
  none = "none",
  pending = "pending",
  approved = "approved",
  suspend = "suspend",
}

export interface IDriver {
  driverId: Types.ObjectId;
  riderId?: Types.ObjectId;
  email: string;
  name?: string;
  isActive?: IsActive;
  vehicle?: {
    make?: string;
    model?: string;
    plate?: string;
  };
  approve: boolean;
  requestStatus?: DriverStatus;
  currentRideId?: string | null;
  availabilityStatus?: AvailabilityStatus;
  earnings: number;
  completedRides: ICompletedRide[];
}
