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
exports.AdminController = void 0;
const CatchAsync_1 = require("../../utils/CatchAsync");
const sendResponce_1 = __importDefault(require("../../utils/sendResponce"));
const admin_service_1 = require("./admin.service");
const getPendingDrivers = (0, CatchAsync_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminService.getPendingDrivers();
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Get all pending drivers",
        data: result,
    });
}));
const approveDriver = (0, CatchAsync_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverId = req.params.id;
    console.log(driverId, "con-20");
    const result = yield admin_service_1.AdminService.approveDriver(driverId);
    console.log(driverId, "con-21");
    console.log(result, "con-23");
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Get all pending drivers",
        data: result,
    });
}));
const rejectDriver = (0, CatchAsync_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverId = req.params.id;
    const result = yield admin_service_1.AdminService.rejectDriver(driverId);
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Reject drivers approve",
        data: result,
    });
}));
const blockDriver = (0, CatchAsync_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverId = req.params.id;
    const result = yield admin_service_1.AdminService.blockDriver(driverId);
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Block driver successfully",
        data: result,
    });
}));
exports.AdminController = {
    getPendingDrivers,
    approveDriver,
    rejectDriver,
    blockDriver,
};
