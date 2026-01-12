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
exports.AuthControllers = void 0;
const auth_service_1 = require("./auth.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const CatchAsync_1 = require("../../utils/CatchAsync");
const sendResponce_1 = __importDefault(require("../../utils/sendResponce"));
const setCookies_1 = require("../../utils/setCookies");
const credentialsLogin = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInfo = yield auth_service_1.AuthServices.credentialsLogin(req.body);
    console.log(loginInfo);
    (0, setCookies_1.setAuthCookie)(res, { accessToken: loginInfo.accessToken });
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "User Logged in Successfully",
        data: loginInfo,
    });
}));
const logout = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("logout");
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log("logout1");
    (0, sendResponce_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Your logout successfully",
        data: null,
    });
}));
exports.AuthControllers = {
    credentialsLogin,
    logout,
};
