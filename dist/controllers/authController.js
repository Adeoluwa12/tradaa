"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const authService_1 = require("../services/authService");
const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        await authService_1.AuthService.register(email, password);
        res.redirect("/auth/login"); // Redirect to login page after successful registration
    }
    catch (error) {
        res.status(400).render("register", { cssFile: "register", error: error });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await authService_1.AuthService.login(email, password);
        res.cookie("token", token, { httpOnly: true }); // Set token in a cookie
        res.redirect("/dashboard"); // Redirect to dashboard
    }
    catch (error) {
        res.status(401).render("login", { cssFile: "login", error: error });
    }
};
exports.login = login;
