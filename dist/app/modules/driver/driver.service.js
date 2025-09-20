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
exports.DriverServices = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const ride_initerface_1 = require("../ride/ride.initerface");
const ride_model_1 = require("../ride/ride.model");
const user_model_1 = require("../user/user.model");
// const acceptRide = async (
//   payload: Partial<IDriver>,
//   driverId: string,
//   rideId: string
// ) => {
//   console.log(driverId, rideId, "dser-10");
//   const createDriver = await Driver.create({
//     driverId: driverId,
//     status: "accepted",
//     ...payload,
//   });
//   const ride = await Ride.findByIdAndUpdate(
//     rideId,
//     {
//       driverId: driverId,
//     },
//     { new: true }
//   );
//   console.log(ride, "dser-11");
//   if (!ride) {
//     throw new AppError(400, "Ride Not Found");
//   }
//   if (ride.status !== RideStatus.requested) {
//     throw new AppError(401, "Ride already taken");
//   }
//   ride.status = RideStatus.accepted;
//   ride.history.push({
//     status: RideStatus.accepted,
//     at: new Date(),
//     by: driverId,
//   });
//   await ride.save();
//   return {
//     ride,
//     createDriver,
//   };
// };
const acceptRide = (payload, driverId, rideId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(driverId, rideId, "dser-10");
    const ride = yield ride_model_1.Ride.findByIdAndUpdate(rideId, {
        driverId: driverId,
    }, { new: true });
    console.log(ride, "dser-11");
    if (!ride) {
        throw new AppError_1.default(400, "Ride Not Found");
    }
    if (ride.status !== ride_initerface_1.RideStatus.requested) {
        throw new AppError_1.default(401, "Ride already taken");
    }
    ride.status = ride_initerface_1.RideStatus.accepted;
    ride.history.push({
        status: ride_initerface_1.RideStatus.accepted,
        at: new Date(),
        by: driverId,
    });
    yield ride.save();
    return ride;
});
// Driver reject ride
const cancelRide = (rideId, driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride)
        throw new AppError_1.default(404, "Ride not found");
    // Only rides that are still "requested" can be cancelled
    if (ride.status !== ride_initerface_1.RideStatus.requested) {
        throw new AppError_1.default(400, "Ride already processed");
    }
    ride.status = ride_initerface_1.RideStatus.cancelled;
    ride.history.push({
        status: ride_initerface_1.RideStatus.cancelled,
        at: new Date(),
        by: driverId,
    });
    yield ride.save({ validateBeforeSave: false });
    return ride;
});
const updateStatus = (driverId, rideId, status) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride)
        throw new Error("Ride not found");
    if (!((_a = ride.driverId) === null || _a === void 0 ? void 0 : _a.equals(driverId)))
        throw new AppError_1.default(403, "Not authorized to update this ride");
    ride.status = status;
    ride.history.push({
        status,
        at: new Date(),
        by: driverId,
    });
    if (status === ride_initerface_1.RideStatus.in_transit) {
        yield ride_model_1.Ride.findByIdAndUpdate(driverId);
    }
    yield ride.save();
    return ride;
});
// view earnings
// const viewEarnings = async (driverId: string) => {
//   // Find driver with earnings populated
//   console.log(driverId, "ddddd");
//   const driver = await User.findOne({ _id: driverId, role: "driver" }).populate(
//     "earnings.ride"
//   );
//   console.log(driver, "rrrrr");
//   if (!driver) {
//     throw new AppError(404, "Driver not found");
//   }
//   return driver.earnings;
// };
//  Driver set Availability
const setAvailability = (driverId, availabilityStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const updateDriver = yield user_model_1.User.findOneAndUpdate({ _id: driverId }, { availabilityStatus }, { new: true });
    return updateDriver;
});
exports.DriverServices = {
    acceptRide,
    cancelRide,
    updateStatus,
    setAvailability,
};
