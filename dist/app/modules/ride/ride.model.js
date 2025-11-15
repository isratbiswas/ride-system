"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ride = void 0;
const mongoose_1 = require("mongoose");
const ride_initerface_1 = require("./ride.initerface");
const completedRideSchema = new mongoose_1.Schema({
    fare: { type: Number, required: true },
    ride: { type: mongoose_1.Types.ObjectId, ref: "Ride", required: true },
    completedAt: { type: Date, default: Date.now },
});
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
    name: {
        type: String,
    },
    email: {
        type: String,
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
    completedAt: { type: Date },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Ride = (0, mongoose_1.model)("Ride", rideSchema);
