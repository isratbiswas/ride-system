import { Document, Types } from "mongoose";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  RIDER = "RIDER",
  DRIVER = "DRIVER",
}

export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}
export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export enum AvailabilityStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}
export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: Role;
  availabilityStatus?: AvailabilityStatus;
  isBlocked?: boolean;
  isActive?: IsActive;
  approved?: boolean;
  isVerified?: boolean;
  rider?: Types.ObjectId[];
  driver?: Types.ObjectId[];
  phone?: String;
  auths: IAuthProvider[];
}
