"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverStatus = exports.AvailabilityStatus = void 0;
var AvailabilityStatus;
(function (AvailabilityStatus) {
    AvailabilityStatus["ONLINE"] = "ONLINE";
    AvailabilityStatus["OFFLINE"] = "OFFLINE";
})(AvailabilityStatus || (exports.AvailabilityStatus = AvailabilityStatus = {}));
var DriverStatus;
(function (DriverStatus) {
    DriverStatus["none"] = "none";
    DriverStatus["pending"] = "pending";
    DriverStatus["approved"] = "approved";
    DriverStatus["rejected"] = "rejected";
})(DriverStatus || (exports.DriverStatus = DriverStatus = {}));
