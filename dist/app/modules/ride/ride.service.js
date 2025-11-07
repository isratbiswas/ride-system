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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideServices = void 0;
const ride_model_1 = require("./ride.model");
const ride_initerface_1 = require("./ride.initerface");
// Rider request a ride
const requestSendByRider = (payload, riderId) => __awaiter(void 0, void 0, void 0, function* () {
    const requesteRide = yield ride_model_1.Ride.create(Object.assign({ riderId: riderId, status: "requested" }, payload));
    return requesteRide;
});
//  Rider  cancel a ride
const cancelRequestByRider = (userId, rideId) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new Error("Ride not Found");
    }
    if (!ride.riderId.equals(userId)) {
        throw new Error("Not Allowed");
    }
    if (ride.status === ride_initerface_1.RideStatus.cancelled) {
        throw new Error("Ride already cancelled");
    }
    ride.status = ride_initerface_1.RideStatus.cancelled;
    ride.history.push({
        status: ride_initerface_1.RideStatus.cancelled,
        at: new Date(),
        by: userId,
    });
    yield ride.save();
    return ride;
});
// Rider get all rider herself
const getMyRides = (riderId) => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield ride_model_1.Ride.find({ riderId }).populate("driverId", "name email");
    const totalRides = yield ride_model_1.Ride.countDocuments();
    console.log(rides, "serv-43");
    return {
        rides,
        meta: {
            total: totalRides,
        },
    };
});
const completedRide = (rideId, driverId) => __awaiter(void 0, void 0, void 0, function* () {
    // const ride = await Ride.findById(rideId);
    // if (!ride) {
    //   return res.status(404).json({ success: false, message: "Ride not found" });
    // }
    // ride.status = RideStatus.completed;
    // ride.completedAt = new Date();
    // await ride.save();
    // //Find driver document
    // const driver = await Ride.findOne({ driverId });
    // if (!driver) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Driver profile not found" });
    // }
});
exports.RideServices = {
    requestSendByRider,
    cancelRequestByRider,
    getMyRides,
    completedRide,
};
