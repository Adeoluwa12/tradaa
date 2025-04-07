"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = void 0;
const alertService_1 = require("../services/alertService");
const getDashboard = async (req, res) => {
    try {
        const latestAlerts = await alertService_1.AlertService.getLatestAlerts(5); // Get the 5 most recent alerts
        res.render("dashboard", {
            user: req.user, // Assuming you have user data in the request
            latestAlerts: latestAlerts,
            cssFile: "dashboard"
        });
    }
    catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).send("Error loading dashboard");
    }
};
exports.getDashboard = getDashboard;
