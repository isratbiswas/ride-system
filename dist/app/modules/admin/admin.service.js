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
const getPendingDrivers = () => __awaiter(void 0, void 0, void 0, function* () {
    const pendingDrivers = yield driver_model_1.Driver.find({
        requestStatus: "pending",
    }).populate("driverId", "name email");
    return pendingDrivers;
});
const approveDriver = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(driverId, "nagib");
    const driver = yield driver_model_1.Driver.findOne({ driverId });
    console.log(driver, "israt");
    if (!driver) {
        throw new AppError_1.default(400, "Driver not found");
    }
    if (driver.requestStatus === "approved") {
        throw new Error("Driver already approved");
    }
    if (driver.requestStatus === "rejected") {
        throw new Error("Driver already rejected");
    }
    driver.requestStatus = driver_interface_1.DriverStatus.approved;
    yield driver.save();
    return driver;
});
const rejectDriver = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_model_1.Driver.findOne({ driverId });
    if (!driver) {
        throw new AppError_1.default(400, "Driver not found");
    }
    if (driver.requestStatus === "rejected") {
        throw new Error("Driver already rejected");
    }
    if (driver.requestStatus === "approved") {
        throw new Error("Driver already approved");
    }
    driver.requestStatus = driver_interface_1.DriverStatus.rejected;
    yield driver.save();
    return driver;
});
const blockDriver = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_model_1.Driver.findOne({ driverId });
    if (!driver) {
        throw new AppError_1.default(400, "Driver not found");
    }
    if (driver.isActive === "BLOCKED") {
        throw new Error("Driver already blocked");
    }
    driver.isActive = user_interface_1.IsActive.BLOCKED;
    yield driver.save();
    return driver;
});
exports.AdminService = {
    getPendingDrivers,
    approveDriver,
    rejectDriver,
    blockDriver,
};
