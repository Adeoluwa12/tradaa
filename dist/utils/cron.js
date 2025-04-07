"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startScheduledTasks = startScheduledTasks;
const node_cron_1 = __importDefault(require("node-cron"));
const alertService_1 = require("../services/alertService");
function startScheduledTasks() {
    // Run every 30 minutes
    node_cron_1.default.schedule("*/30 * * * *", async () => {
        console.log("Running scheduled alert check");
        try {
            const newAlerts = await alertService_1.AlertService.fetchAlerts();
            await alertService_1.AlertService.notifyUsers(newAlerts);
        }
        catch (error) {
            console.error("Error in scheduled alert check:", error);
        }
    });
}
