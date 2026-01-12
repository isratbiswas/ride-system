export interface RegisterPayload {
  userId: string;
  role: "RIDER" | "DRIVER";
}

export interface createRidePayload {
  riderId: string;
  pickup: string;
  destination: string;
}

export interface AcceptRidePayload {
  rideId: string;
  driverId: string;
}
