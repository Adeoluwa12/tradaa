"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token; // Read token from cookies
    if (!token) {
        return res.redirect("/auth/login"); // Redirect to login if not authenticated
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request object
        next();
    }
    catch (error) {
        res.redirect("/auth/login"); // Redirect to login if token is invalid
    }
};
exports.isAuthenticated = isAuthenticated;
