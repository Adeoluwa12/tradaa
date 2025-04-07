// src/routes/authRoutes.ts
import express from "express";
import { register, login } from "../controllers/authController";

const router = express.Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Logout route
router.get("/logout", (req, res) => {
    res.clearCookie("token"); // Clear the token cookie
    res.redirect("/auth/login"); // Redirect to login page
});

// Render login page (GET request)
router.get("/login", (req, res) => {
    res.render("login", { cssFile: "login", user: null}); // Pass cssFile to login.ejs
});


// Render register page (GET request)
router.get("/register", (req, res) => {
    res.render("register", { cssFile: "register", user: null }); // Pass cssFile to register.ejs
});

export default router;