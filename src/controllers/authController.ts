// src/controllers/authController.ts
import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        await AuthService.register(email, password);
        res.redirect("/auth/login"); // Redirect to login page after successful registration
    } catch (error) {
        res.status(400).render("register", { cssFile: "register", error: error});
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const token = await AuthService.login(email, password);
        res.cookie("token", token, { httpOnly: true }); // Set token in a cookie
        res.redirect("/dashboard"); // Redirect to dashboard
    } catch (error) {
        res.status(401).render("login", { cssFile: "login", error: error });
    }
}; 