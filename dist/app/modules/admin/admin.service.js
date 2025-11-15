"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const driver_model_1 = require("../driver/driver.model");
const driver_interface_1 = require("../driver/driver.interface");
const user_interface_1 = require("../user/user.interface");
const user_model_1 = require("../user/user.model");
const ride_model_1 = require("../ride/ride.model");
const getPendingDrivers = () => __awaiter(void 0, void 0, void 0, function* () {
    const pendingDrivers = yield driver_model_1.Driver.find({
        requestStatus: "pending",
    }).populate("driverId", "name email");
    return pendingDrivers;
});
const approveDriver = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_model_1.Driver.findById(driverId);
    if (!driver) {
        throw new AppError_1.default(400, "Driver not found");
    }
    if (driver.requestStatus === "approved") {
        throw new Error("Driver already approved");
    }
    if (driver.requestStatus === "suspend") {
        throw new Error("Driver already rejected");
    }
    driver.requestStatus = driver_interface_1.DriverStatus.approved;
    yield driver.save();
    return driver;
});
const suspendDriver = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(driverId, "nagib");
    const driver = yield driver_model_1.Driver.findById(driverId);
    console.log(driver, "israt");
    if (!driver) {
        throw new AppError_1.default(400, "Driver not found");
    }
    if (driver.requestStatus === "suspend") {
        throw new Error("Driver already rejected");
    }
    driver.requestStatus = driver_interface_1.DriverStatus.suspend;
    yield driver.save();
    return driver;
});
const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userId, "user");
    const user = yield user_model_1.User.findById(userId);
    console.log(user, "ser-50");
    if (!user) {
        throw new AppError_1.default(400, "user not found");
    }
    user.isActive = user_interface_1.IsActive.BLOCKED;
    yield user.save();
    return user;
});
const unblockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userId, "userUN");
    const user = yield user_model_1.User.findById(userId);
    console.log(user, "ser-50");
    if (!user) {
        throw new AppError_1.default(400, "user not found");
    }
    user.isActive = user_interface_1.IsActive.UNBLOCKED;
    yield user.save();
    return user;
});
const analyticsOverview = () => __awaiter(void 0, void 0, void 0, function* () {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const ridesAgg = yield ride_model_1.Ride.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo }, status: "completed" } },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                count: { $sum: 1 },
                revenue: { $sum: "$fare" },
            },
        },
        { $sort: { _id: 1 } },
    ]);
    return ridesAgg;
});
const getTotalRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalRevenue = yield ride_model_1.Ride.aggregate([
        { $match: { status: "completed" } },
        {
            $group: {
                _id: null,
                revenue: { $sum: "$fare" },
                rides: { $sum: 1 },
            },
        },
    ]);
    return totalRevenue[0] || { revenue: 0, rides: 0 };
});
const getTopDrivers = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (limit = 5) {
    const topDrivers = yield ride_model_1.Ride.aggregate([
        { $match: { driver: { $ne: null }, status: "completed" } },
        // Group by driver ID
        {
            $group: {
                _id: "$driver",
                rides: { $sum: 1 },
                revenue: { $sum: "$fare" },
            },
        },
        // Sort by number of rides
        { $sort: { rides: -1 } },
        // Limit to top N drivers
        { $limit: limit },
        // Lookup driver details from User collection
        {
            $lookup: {
                from: "users", // MongoDB collection name (make sure it matches)
                localField: "_id",
                foreignField: "_id",
                as: "driverInfo",
            },
        },
        // Unwind the array to get single object
        { $unwind: "$driverInfo" },
        // Project required fields
        {
            $project: {
                _id: 0,
                driverId: "$_id",
                name: "$driverInfo.name",
                email: "$driverInfo.email",
                rides: 1,
                revenue: 1,
            },
        },
    ]);
    return topDrivers;
});
exports.AdminService = {
    getPendingDrivers,
    approveDriver,
    unblockUser,
    suspendDriver,
    blockUser,
    analyticsOverview,
    getTotalRevenue,
    getTopDrivers,
};
