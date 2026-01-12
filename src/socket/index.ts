import { Server, Socket } from "socket.io";
import { AcceptRidePayload, createRidePayload } from "./socket.type";
import { Ride } from "../app/modules/ride/ride.model";
import { RideStatus } from "../app/modules/ride/ride.initerface";

const onlineUsers = new Map<string, string>();

export const initSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Connected:", socket.id);

    // rider create ride
    socket.on("createRide", async (data: createRidePayload) => {
      const ride = await Ride.create({
        rider: data.riderId,
        pickup: data.pickup,
        destination: data.destination,
        status: "requested",
      });

      //send to all drivers
      io.to("driver").emit("newRideRequest", ride);
    });
    // driver accept
    socket.on("acceptRide", async ({ rideId, driverId }: AcceptRidePayload) => {
      const ride = await Ride.findById(rideId);
      if (!ride || ride.status !== "requested") return;
      ride.status = RideStatus.accepted;
      ride.history.push({
        status: RideStatus.accepted,
        at: new Date(),
        by: driverId,
      });
      await ride.save();
      const riderSocketId = onlineUsers.get(ride.riderId.toString());
      if (riderSocketId) {
        io.to(riderSocketId).emit("rideAccepted", ride);
      }
    });
  });
};
