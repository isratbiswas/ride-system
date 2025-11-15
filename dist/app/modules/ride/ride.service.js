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
    console.log(rideId, "can-2");
    const ride = yield ride_model_1.Ride.findById(rideId);
    console.log(ride, "cna-1");
    if (!ride) {
        throw new Error("Ride not Found");
    }
    if (!ride.riderId.equals(userId)) {
        throw new Error("Not Allowed");
    }
    if (ride.status === ride_initerface_1.RideStatus.cancelled) {
        throw new Error("Ride already cancelled");
    }
    // Important extra validations
    if (ride.status === ride_initerface_1.RideStatus.in_transit) {
        throw new Error("Cannot cancel an ongoing ride");
    }
    if (ride.status === ride_initerface_1.RideStatus.completed) {
        throw new Error("Ride already completed");
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
    const totalRides = yield ride_model_1.Ride.countDocuments({ riderId });
    return {
        rides,
        meta: {
            total: totalRides,
        },
    };
});
exports.RideServices = {
    requestSendByRider,
    cancelRequestByRider,
    getMyRides,
};
