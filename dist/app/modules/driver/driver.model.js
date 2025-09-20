"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const mongoose_1 = require("mongoose");
const driverSchema = new mongoose_1.Schema({
    driverId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    approved: { type: Boolean, ref: "User" },
    vehicle: {
        make: String,
        model: String,
        plate: String,
    },
    currentRideId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Ride", default: null },
    earnings: [
        {
            amount: { type: Number, required: true },
            at: { type: Date, default: Date },
            ride: { type: mongoose_1.Schema.Types.ObjectId, ref: "Ride" },
        },
    ],
});
exports.Driver = (0, mongoose_1.model)("Driver", driverSchema);
