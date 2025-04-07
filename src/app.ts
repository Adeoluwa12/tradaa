// src/app.ts
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import stockRoutes from "./routes/stockRoutes";
import alertRoutes from "./routes/alertRoutes";
import reportRoutes from "./routes/reportRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import {startScheduledTasks } from "./utils/cron";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser"; // Import cookie-parser

dotenv.config(); // Load environment variables

const app = express(); 

// Set up cookie-parser
app.use(cookieParser());   

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Set the views directory

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.render("home", { cssFile: "home" }); // Render the home.ejs file
});

// Use authRoutes for /auth
app.use("/auth", authRoutes);

// Use dashboard routes
app.use("/dashboard", dashboardRoutes)

// Use other routes
app.use("/stocks", stockRoutes);
app.use("/alerts", alertRoutes);
app.use("/reports", reportRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Start Cron Jobs
startScheduledTasks()

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));