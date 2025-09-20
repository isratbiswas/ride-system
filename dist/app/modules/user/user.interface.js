"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityStatus = exports.IsActive = exports.Role = void 0;
var Role;
(function (Role) {
    Role["SUPER_ADMIN"] = "SUPER_ADMIN";
    Role["ADMIN"] = "ADMIN";
    Role["RIDER"] = "RIDER";
    Role["DRIVER"] = "DRIVER";
})(Role || (exports.Role = Role = {}));
var IsActive;
(function (IsActive) {
    IsActive["ACTIVE"] = "ACTIVE";
    IsActive["INACTIVE"] = "INACTIVE";
    IsActive["BLOCKED"] = "BLOCKED";
})(IsActive || (exports.IsActive = IsActive = {}));
var AvailabilityStatus;
(function (AvailabilityStatus) {
    AvailabilityStatus["ONLINE"] = "ONLINE";
    AvailabilityStatus["OFFLINE"] = "OFFLINE";
})(AvailabilityStatus || (exports.AvailabilityStatus = AvailabilityStatus = {}));
