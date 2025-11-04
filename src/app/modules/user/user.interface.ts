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

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: Role;

  isBlocked?: boolean;
  isActive?: IsActive;
  approve?: boolean;
  isVerified?: boolean;
  rider?: Types.ObjectId[];
  driver?: Types.ObjectId[];
  phone?: String;
  auths: IAuthProvider[];
}
