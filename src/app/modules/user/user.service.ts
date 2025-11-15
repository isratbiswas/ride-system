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
  const { email, password, role, phone, ...rest } = payload;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

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
    phone,
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
  const user = await User.findById(userId);
  return {
    data: user,
  };
};
const getAllUsers = async (query: any) => {
  const {
    q,
    role,
    blocked,
    startDate,
    endDate,
    sortBy = "createdAt",
    sortOrder = "desc",
    page = 1,
    limit = 20,
  } = query;

  const filter: Record<string, any> = {};

  //  Search (by name or email)
  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
    ];
  }

  //  Filter by role
  if (role) filter.role = role;

  //  Filter by blocked status
  if (typeof blocked !== "undefined") {
    filter.blocked = blocked === "true";
  }

  //  Filter by date range
  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) filter.createdAt.$lte = new Date(endDate);
  }

  // 📄 Pagination setup
  const pageNumber = Math.max(Number(page), 1); // minimum page = 1
  const limitNumber = Math.min(Math.max(Number(limit), 1), 50); // min 1, max 50
  const skip = (pageNumber - 1) * limitNumber;

  // ↕️ Sorting setup
  const sort: Record<string, 1 | -1> = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
  };

  // 🚀 Execute queries in parallel
  const [users, totalUsers] = await Promise.all([
    User.find(filter).skip(skip).limit(limitNumber).sort(sort),
    User.countDocuments(filter),
  ]);
  return {
    data: users,
    meta: {
      total: totalUsers,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(totalUsers / limitNumber),
    },
  };
};

const updateProfile = async (userId: string, payload: Partial<IUser>) => {
  if (payload.password) {
    const hashedPassword = await bcryptjs.hash(
      payload.password,
      Number(envVars.BCRYPT_SALT_ROUND)
    );
    payload.password = hashedPassword;
  }
  const profile = await User.findByIdAndUpdate(
    userId,
    { $set: payload },
    { new: true, runValidators: true }
  ).select("-password");
  return profile;
};

export const UserServices = {
  createUser,
  updateUser,
  getAllUsers,
  getme,
  updateProfile,
};
