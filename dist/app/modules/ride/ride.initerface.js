"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideHistorySchema = exports.RideStatus = void 0;
const mongoose_1 = require("mongoose");
var RideStatus;
(function (RideStatus) {
    RideStatus["requested"] = "requested";
    RideStatus["accepted"] = "accepted";
    RideStatus["cancelled"] = "cancelled";
    RideStatus["completed"] = "completed";
    RideStatus["picked_up"] = "picked_up";
    RideStatus["in_transit"] = "in_transit";
})(RideStatus || (exports.RideStatus = RideStatus = {}));
exports.rideHistorySchema = new mongoose_1.Schema({
    status: { type: String, enum: Object.values(RideStatus), required: true },
    at: { type: Date, default: Date.now },
    by: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", default: null },
}, { _id: false });
