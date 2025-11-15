"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsActive = exports.AvailabilityStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role["SUPER_ADMIN"] = "SUPER_ADMIN";
    Role["ADMIN"] = "ADMIN";
    Role["RIDER"] = "RIDER";
    Role["DRIVER"] = "DRIVER";
})(Role || (exports.Role = Role = {}));
var AvailabilityStatus;
(function (AvailabilityStatus) {
    AvailabilityStatus["ONLINE"] = "ONLINE";
    AvailabilityStatus["OFFLINE"] = "OFFLINE";
})(AvailabilityStatus || (exports.AvailabilityStatus = AvailabilityStatus = {}));
var IsActive;
(function (IsActive) {
    IsActive["ACTIVE"] = "ACTIVE";
    IsActive["INACTIVE"] = "INACTIVE";
    IsActive["BLOCKED"] = "BLOCKED";
    IsActive["UNBLOCKED"] = "UNBLOCKED";
})(IsActive || (exports.IsActive = IsActive = {}));
