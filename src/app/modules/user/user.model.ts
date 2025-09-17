import { model, Schema } from "mongoose";
import { IAuthProvider, IsActive, IUser, Role } from "./user.interface";

const authProviderSchema = new Schema<IAuthProvider>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const userSchema = new Schema<IUser>(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.RIDER,
    },
    approved: { type: Boolean, default: false },
    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
    },
    isBlocked: { type: Boolean, default: false },
    phone: { type: String },
    isVerified: { type: Boolean, default: true },
    auths: [authProviderSchema],
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);
