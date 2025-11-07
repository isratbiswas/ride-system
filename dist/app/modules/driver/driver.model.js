"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const mongoose_1 = require("mongoose");
const driver_interface_1 = require("./driver.interface");
const user_interface_1 = require("../user/user.interface");
const completedRideSchema = new mongoose_1.Schema({
    fare: { type: Number, required: true },
    ride: { type: mongoose_1.Types.ObjectId, ref: "Ride", required: true },
    completedAt: { type: Date, default: Date.now },
});
const driverSchema = new mongoose_1.Schema({
    driverId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    riderId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Ride" },
    approve: { type: Boolean },
    name: { type: String },
    email: { type: String },
    vehicle: {
        make: String,
        model: String,
        plate: String,
    },
    isActive: {
        type: String,
        enum: Object.values(user_interface_1.IsActive),
        default: user_interface_1.IsActive.ACTIVE,
    },
    availabilityStatus: {
        type: String,
        enum: Object.values(driver_interface_1.AvailabilityStatus),
        default: driver_interface_1.AvailabilityStatus.OFFLINE,
    },
    requestStatus: {
        type: String,
        enum: Object.values(driver_interface_1.DriverStatus),
        default: driver_interface_1.DriverStatus.none,
    },
    currentRideId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Ride", default: null },
    earnings: { type: Number, default: 0 },
    complatedRides: [completedRideSchema],
});
exports.Driver = (0, mongoose_1.model)("Driver", driverSchema);
