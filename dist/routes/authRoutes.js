"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// Register route
router.post("/register", authController_1.register);
// Login route
router.post("/login", authController_1.login);
// Logout route
router.get("/logout", (req, res) => {
    res.clearCookie("token"); // Clear the token cookie
    res.redirect("/auth/login"); // Redirect to login page
});
// Render login page (GET request)
router.get("/login", (req, res) => {
    res.render("login", { cssFile: "login", user: null }); // Pass cssFile to login.ejs
});
// Render register page (GET request)
router.get("/register", (req, res) => {
    res.render("register", { cssFile: "register", user: null }); // Pass cssFile to register.ejs
});
exports.default = router;
