import { NextFunction, Request, Response } from "express";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { CatchAsync } from "../../utils/CatchAsync";
import { Driver } from "../driver/driver.model";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, role, ...rest } = payload;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new Error("user already exist");
  }
  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );
  const validRole =
    role && Object.values(Role).includes(role) ? role : Role.RIDER;
  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };
  const user = await User.create({
    email,
    password: hashedPassword,
    role: validRole,
    auths: [authProvider],
    ...rest,
  });
  if (role === Role.DRIVER) {
    await Driver.create({
      driverId: user._id,
      ...payload,
      ...rest,
    });
  }
  return user;
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  if (decodedToken.role === Role.RIDER || decodedToken.role === Role.DRIVER) {
    if (userId !== decodedToken.userId) {
      throw new AppError(401, "You are not authorized");
    }
  }

  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (
    decodedToken.role === Role.ADMIN &&
    isUserExist.role === Role.SUPER_ADMIN
  ) {
    throw new AppError(401, "You are not authorized");
  }

  if (payload.role) {
    if (decodedToken.role === Role.DRIVER || decodedToken.role === Role.RIDER) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return newUpdatedUser;
};
const getme = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  return {
    data: user,
  };
};
const getAllUsers = async () => {
  const users = await User.find();
  const totalUsers = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

export const UserServices = {
  createUser,
  updateUser,
  getAllUsers,
  getme,
};
