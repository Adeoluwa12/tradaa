"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../model/userModel");
class AuthService {
    static async register(email, password) {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = new userModel_1.User({ email, password: hashedPassword });
        await user.save();
        return user;
    }
    static async login(email, password) {
        const user = await userModel_1.User.findOne({ email });
        if (!user)
            throw new Error("User not found");
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid)
            throw new Error("Invalid password");
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return token;
    }
}
exports.AuthService = AuthService;
