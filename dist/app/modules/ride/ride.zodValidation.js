"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideCreateSchema = exports.rideHistorySchema = exports.RideStatusEnum = void 0;
const zod_1 = require("zod");
exports.RideStatusEnum = zod_1.z.enum([
    "requested",
    "accepted",
    "cancelled",
    "completed",
    "picked_up",
    "in_transit",
]);
exports.rideHistorySchema = zod_1.z.object({
    status: exports.RideStatusEnum,
    at: zod_1.z.date().optional(),
    by: zod_1.z.string().nullable().optional(),
});
exports.rideCreateSchema = zod_1.z.object({
    riderId: zod_1.z.string().min(1, "Rider ID is required"),
    name: zod_1.z.string().min(1, "Rider name is required"),
    email: zod_1.z.string().email("Valid email required"),
    driverId: zod_1.z.string().nullable().optional(),
    pickup: zod_1.z.object({
        address: zod_1.z.string().min(1, "Pickup address is required"),
        coords: zod_1.z
            .object({
            lat: zod_1.z.number(),
            lng: zod_1.z.number(),
        })
            .optional(),
    }),
    destination: zod_1.z.object({
        address: zod_1.z.string().min(1, "Destination address is required"),
        coords: zod_1.z
            .object({
            lat: zod_1.z.number(),
            lng: zod_1.z.number(),
        })
            .optional(),
    }),
    status: exports.RideStatusEnum,
    history: zod_1.z.array(exports.rideHistorySchema).optional(),
    fare: zod_1.z.number().min(0, "Fare must be positive"),
    driverPayout: zod_1.z.number().optional(),
    // backend auto adds these but still keeping optional
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
    completedAt: zod_1.z.date().optional(),
});
