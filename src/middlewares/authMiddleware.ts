// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token; // Read token from cookies

    if (!token) {
        return res.redirect("/auth/login"); // Redirect to login if not authenticated
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = decoded; // Attach user data to the request object
        next();
    } catch (error) {
        res.redirect("/auth/login"); // Redirect to login if token is invalid
    }
};