"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const authProviderSchema = new mongoose_1.Schema({
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
}, {
    versionKey: false,
    _id: false,
});
const userSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String },
    role: {
        type: String,
        enum: Object.values(user_interface_1.Role),
        default: user_interface_1.Role.RIDER,
    },
    availabilityStatus: {
        type: String,
        enum: Object.values(user_interface_1.AvailabilityStatus),
        default: user_interface_1.AvailabilityStatus.OFFLINE,
    },
    approved: { type: Boolean, default: false },
    isActive: {
        type: String,
        enum: Object.values(user_interface_1.IsActive),
        default: user_interface_1.IsActive.ACTIVE,
    },
    isBlocked: { type: Boolean, default: false },
    phone: { type: String },
    isVerified: { type: Boolean, default: true },
    auths: [authProviderSchema],
}, {
    timestamps: true,
    versionKey: false,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
