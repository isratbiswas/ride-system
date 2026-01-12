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
exports.DriverController = void 0;
const CatchAsync_1 = require("../../utils/CatchAsync");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const sendResponce_1 = __importDefault(require("../../utils/sendResponce"));
const driver_service_1 = require("./driver.service");
const getRequest = (0, CatchAsync_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield driver_service_1.DriverServices.getRequest();
    console.log(result, "request-1");
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "All Ride Request is retreieved",
        data: result,
    });
}));
const acceptRide = (0, CatchAsync_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverId = req.user.userId;
    console.log(driverId, "dcon-10");
    const rideId = req.params.id;
    console.log("rideId", "dcon-11");
    const ride = yield driver_service_1.DriverServices.acceptRide(driverId, rideId);
    console.log(ride, "dcon-13");
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.ACCEPTED,
        message: "Driver accept a ride successfully",
        data: ride,
    });
}));
// driver cancel ride
// const cancelRide = CatchAsync(async (req: Request, res: Response) => {
//   const driverId = (req.user as JwtPayload).userId;
//   const riderId = (req.user as JwtPayload).userId;
//   console.log(driverId, "jfld");
//   const rideId = req.params.id;
//   const ride = await DriverServices.cancelRide(rideId, driverId, riderId);
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Driver cancel a ride",
//     data: ride,
//   });
// });
const cancelRide = (0, CatchAsync_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverId = req.user.userId; // ✅ driverId only
    const rideId = req.params.id;
    const ride = yield driver_service_1.DriverServices.cancelRide(rideId, driverId);
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Driver cancelled a ride",
        data: ride,
    });
}));
// driver update status
const updateStatus = (0, CatchAsync_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverId = req.user.userId;
    const rideId = req.params.id;
    console.log(rideId, "midffd");
    const { status } = req.body;
    const rides = yield driver_service_1.DriverServices.updateStatus(driverId, rideId, status);
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Driver update status",
        data: rides,
    });
}));
// driver view earnings
const viewEarnings = (0, CatchAsync_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverId = req.user.userId;
    console.log(driverId, "dlfdj");
    const earnings = yield driver_service_1.DriverServices.viewEarnings(driverId);
    console.log(earnings, "lllll");
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Driver earnings retrieved successfully",
        data: { earnings: earnings },
    });
}));
// const getDriverProfile = async (req: Request, res: Response) => {
//   try {
//     const driverId = req.user as JwtPayload;
//     const driver = await DriverServices.getDriverProfileService(
//       driverId.userId
//     );
//     res.status(200).json({
//       message: "Driver profile fetched successfully",
//       driver,
//     });
//   } catch (err: any) {
//     res.status(500).json({ message: err.message });
//   }
// };
// Driver set availityStatus
const setAvailability = (0, CatchAsync_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = req.user; // get driverId from JWT
    const { availabilityStatus } = req.body; // { availabilityStatus: "ONLINE" }
    const updatedDriver = yield driver_service_1.DriverServices.setAvailability(driver.userId, availabilityStatus);
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: `Driver is now ${availabilityStatus}`,
        data: updatedDriver,
    });
}));
const completeRide = (0, CatchAsync_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverId = req.user.userId;
    const rideId = req.params.id;
    console.log(rideId, "midffd");
    const rides = yield driver_service_1.DriverServices.completeRideService(driverId, rideId);
    res.status(200).json({
        message: "Ride completed successfully",
        rides,
    });
}));
const requestForApprove = (0, CatchAsync_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverId = req.user.userId;
    const result = yield driver_service_1.DriverServices.requestForApprove(driverId);
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Driver request admin for approve",
        data: result,
    });
}));
const getDriverProfile = (0, CatchAsync_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = req.user;
    const rides = yield driver_service_1.DriverServices.getDriverProfile(driver.userId);
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "My Ride Retrieved Successfully",
        data: rides,
    });
}));
exports.DriverController = {
    getRequest,
    acceptRide,
    updateStatus,
    cancelRide,
    setAvailability,
    getDriverProfile,
    completeRide,
    requestForApprove,
    viewEarnings,
};
