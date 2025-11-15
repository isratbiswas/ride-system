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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../../config/env");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const driver_model_1 = require("../driver/driver.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role, phone } = payload, rest = __rest(payload, ["email", "password", "role", "phone"]);
    if (!email || !password) {
        throw new Error("Email and password are required");
    }
    const isUserExist = yield user_model_1.User.findOne({ email });
    if (isUserExist) {
        throw new Error("user already exist");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    const validRole = role && Object.values(user_interface_1.Role).includes(role) ? role : user_interface_1.Role.RIDER;
    const authProvider = {
        provider: "credentials",
        providerId: email,
    };
    const user = yield user_model_1.User.create(Object.assign({ email, password: hashedPassword, role: validRole, auths: [authProvider], phone }, rest));
    if (role === user_interface_1.Role.DRIVER) {
        yield driver_model_1.Driver.create(Object.assign(Object.assign({ driverId: user._id }, payload), rest));
    }
    return user;
});
const updateUser = (userId, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    if (decodedToken.role === user_interface_1.Role.RIDER || decodedToken.role === user_interface_1.Role.DRIVER) {
        if (userId !== decodedToken.userId) {
            throw new AppError_1.default(401, "You are not authorized");
        }
    }
    const isUserExist = yield user_model_1.User.findById(userId);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    if (decodedToken.role === user_interface_1.Role.ADMIN &&
        isUserExist.role === user_interface_1.Role.SUPER_ADMIN) {
        throw new AppError_1.default(401, "You are not authorized");
    }
    if (payload.role) {
        if (decodedToken.role === user_interface_1.Role.DRIVER || decodedToken.role === user_interface_1.Role.RIDER) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not authorized");
        }
    }
    const newUpdatedUser = yield user_model_1.User.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });
    return newUpdatedUser;
});
const getme = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    return {
        data: user,
    };
});
const getAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { q, role, blocked, startDate, endDate, sortBy = "createdAt", sortOrder = "desc", page = 1, limit = 20, } = query;
    const filter = {};
    //  Search (by name or email)
    if (q) {
        filter.$or = [
            { name: { $regex: q, $options: "i" } },
            { email: { $regex: q, $options: "i" } },
        ];
    }
    //  Filter by role
    if (role)
        filter.role = role;
    //  Filter by blocked status
    if (typeof blocked !== "undefined") {
        filter.blocked = blocked === "true";
    }
    //  Filter by date range
    if (startDate || endDate) {
        filter.createdAt = {};
        if (startDate)
            filter.createdAt.$gte = new Date(startDate);
        if (endDate)
            filter.createdAt.$lte = new Date(endDate);
    }
    // 📄 Pagination setup
    const pageNumber = Math.max(Number(page), 1); // minimum page = 1
    const limitNumber = Math.min(Math.max(Number(limit), 1), 50); // min 1, max 50
    const skip = (pageNumber - 1) * limitNumber;
    // ↕️ Sorting setup
    const sort = {
        [sortBy]: sortOrder === "asc" ? 1 : -1,
    };
    // 🚀 Execute queries in parallel
    const [users, totalUsers] = yield Promise.all([
        user_model_1.User.find(filter).skip(skip).limit(limitNumber).sort(sort),
        user_model_1.User.countDocuments(filter),
    ]);
    return {
        data: users,
        meta: {
            total: totalUsers,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(totalUsers / limitNumber),
        },
    };
});
const updateProfile = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.password) {
        const hashedPassword = yield bcryptjs_1.default.hash(payload.password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
        payload.password = hashedPassword;
    }
    const profile = yield user_model_1.User.findByIdAndUpdate(userId, { $set: payload }, { new: true, runValidators: true }).select("-password");
    return profile;
});
exports.UserServices = {
    createUser,
    updateUser,
    getAllUsers,
    getme,
    updateProfile,
};
