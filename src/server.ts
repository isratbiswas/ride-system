import mongoose from "mongoose";
import http from "http";
import { envVars } from "./app/config/env";
import app from "./app";
import { Server } from "socket.io";
import { initSocket } from "./socket";

let server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
initSocket(io);

const port = 5000;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("connect to DB");
    server = app.listen(envVars.PORT, () => {
      console.log(`server is listening ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

// *  signal termination sigterm
process.on("SIGTERM", () => {
  console.log("uncaught exception  detected... Server shutting down ");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// *  signal termination sigterm
process.on("SIGINT", () => {
  console.log("sigint signal detected... Server shutting down ");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// unhandled rejection error
process.on("unhandledRejection", (err) => {
  console.log("unhandled Rejection detected... Server shutting down ", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
//   Promise.reject(new Error("I forgot to catch this promise"))

//uncaught rejection error

process.on("uncaughtException", (err) => {
  console.log("uncaught exception  detected... Server shutting down ", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// throw new Error("I forgot to catch this promise")
