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
exports.RideController = void 0;
const CatchAsync_1 = require("../../utils/CatchAsync");
const ride_service_1 = require("./ride.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const sendResponce_1 = __importDefault(require("../../utils/sendResponce"));
const requestSendByRider = (0, CatchAsync_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const riderId = req.user.userId;
    const ride = yield ride_service_1.RideServices.requestSendByRider(req.body, riderId);
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Rider send request for ride",
        data: ride,
    });
}));
const cancelRequestByRider = (0, CatchAsync_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rider = req.user;
    const rideId = req.params.id;
    console.log(rideId, "con-can-3");
    const ride = yield ride_service_1.RideServices.cancelRequestByRider(rider.userId, rideId);
    console.log(ride, "cont-26");
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Ride Cancel Successfully",
        data: ride,
    });
}));
const getMyRides = (0, CatchAsync_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rider = req.user;
    const rides = yield ride_service_1.RideServices.getMyRides(rider.userId);
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "My Ride Retrieved Successfully",
        data: rides,
    });
}));
exports.RideController = {
    requestSendByRider,
    cancelRequestByRider,
    getMyRides,
};
