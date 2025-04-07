"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runManualCheck = exports.getLatestAlerts = exports.getAlerts = void 0;
const alertService_1 = require("../services/alertService");
const getAlerts = async (req, res) => {
    try {
        // Fetch all alerts
        const allAlerts = await alertService_1.AlertService.getAllAlerts();
        // Get the user from the request (assuming it's attached by your authentication middleware)
        const user = req.user;
        // Render the alerts.ejs template and pass the required data
        res.render("alerts", {
            cssFile: "alerts",
            user, // Pass the user object to the template
            allAlerts, // Pass the alerts data to the template
        });
    }
    catch (error) {
        console.error("Error fetching alerts:", error);
        res.status(500).send("Error fetching alerts");
    }
};
exports.getAlerts = getAlerts;
const getLatestAlerts = async (req, res) => {
    try {
        const latestAlerts = await alertService_1.AlertService.getLatestAlerts();
        res.json(latestAlerts);
    }
    catch (error) {
        console.error("Error fetching latest alerts:", error);
        res.status(500).json({ error: "Error fetching latest alerts" });
    }
};
exports.getLatestAlerts = getLatestAlerts;
const runManualCheck = async (req, res) => {
    try {
        const newAlerts = await alertService_1.AlertService.fetchAlerts();
        await alertService_1.AlertService.notifyUsers(newAlerts);
        res.json({ message: "Manual check completed", newAlerts });
    }
    catch (error) {
        console.error("Error running manual check:", error);
        res.status(500).json({ error: "Error running manual check" });
    }
};
exports.runManualCheck = runManualCheck;
