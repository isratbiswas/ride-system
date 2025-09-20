"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatchAsync = void 0;
const CatchAsync = (fn) => (req, res, next) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Promise.resolve(fn(req, res, next)).catch((err) => {
        next(err);
    });
};
exports.CatchAsync = CatchAsync;
