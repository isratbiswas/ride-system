import { z } from "zod";

export const RideStatusEnum = z.enum([
  "requested",
  "accepted",
  "cancelled",
  "completed",
  "picked_up",
  "in_transit",
]);

export const rideHistorySchema = z.object({
  status: RideStatusEnum,
  at: z.date().optional(),
  by: z.string().nullable().optional(),
});

export const rideCreateSchema = z.object({
  riderId: z.string().min(1, "Rider ID is required"),
  name: z.string().min(1, "Rider name is required"),
  email: z.string().email("Valid email required"),

  driverId: z.string().nullable().optional(),

  pickup: z.object({
    address: z.string().min(1, "Pickup address is required"),
    coords: z
      .object({
        lat: z.number(),
        lng: z.number(),
      })
      .optional(),
  }),

  destination: z.object({
    address: z.string().min(1, "Destination address is required"),
    coords: z
      .object({
        lat: z.number(),
        lng: z.number(),
      })
      .optional(),
  }),

  status: RideStatusEnum,
  history: z.array(rideHistorySchema).optional(),

  fare: z.number().min(0, "Fare must be positive"),
  driverPayout: z.number().optional(),

  // backend auto adds these but still keeping optional
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  completedAt: z.date().optional(),
});

export type RideCreateInput = z.infer<typeof rideCreateSchema>;
