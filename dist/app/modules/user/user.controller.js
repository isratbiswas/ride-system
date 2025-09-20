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
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const CatchAsync_1 = require("../../utils/CatchAsync");
// import { sendResponse } from "../../utils/sendResponce";
const sendResponce_1 = __importDefault(require("../../utils/sendResponce"));
const createUser = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserServices.createUser(req.body);
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "User created successfully",
        data: user,
    });
}));
const updateUser = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const verifiedToken = req.user;
    const payload = req.body;
    const user = yield user_service_1.UserServices.updateUser(userId, payload, verifiedToken);
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "User updated successfully",
        data: user,
    });
}));
const getme = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const result = yield user_service_1.UserServices.getme(decodedToken.userId);
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "User retrived successfully",
        data: result.data,
    });
}));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllUsers = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.getAllUsers();
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta,
    });
}));
exports.UserControllers = {
    createUser,
    updateUser,
    getAllUsers,
    getme,
};
