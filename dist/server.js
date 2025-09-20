"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./app/config/env");
const app_1 = __importDefault(require("./app"));
let server;
const port = 5000;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(env_1.envVars.DB_URL);
        console.log("connect to DB");
        server = app_1.default.listen(env_1.envVars.PORT, () => {
            console.log(`server is listening ${env_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
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
