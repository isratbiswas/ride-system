"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ride = void 0;
const mongoose_1 = require("mongoose");
const ride_initerface_1 = require("./ride.initerface");
const rideSchema = new mongoose_1.Schema({
    riderId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    driverId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", default: null },
    pickup: {
        address: String,
        coords: {
            lat: Number,
            lng: Number,
        },
    },
    destination: {
        address: String,
        coords: {
            lat: Number,
            lng: Number,
        },
    },
    status: {
        type: String,
        enum: Object.values(ride_initerface_1.RideStatus),
        required: true,
    },
    history: {
        type: [ride_initerface_1.rideHistorySchema],
        default: [],
    },
    fare: { type: Number, default: 0 },
    driverPayout: { type: Number, default: 0 },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Ride = (0, mongoose_1.model)("Ride", rideSchema);
