"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/reportRoutes.ts
const express_1 = __importDefault(require("express"));
const reportService_1 = require("../services/reportService");
const mailUtils_1 = require("../utils/mailUtils");
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    try {
        const stocks = await reportService_1.ReportService.fetchDailyStocks();
        const report = await reportService_1.ReportService.generateReport(stocks);
        await (0, mailUtils_1.sendEmail)({
            to: "process.env.EMAIL_RECIPIENTS",
            subject: "Daily Stock Report",
            text: report,
        });
        res.render("report", { cssFile: "report", report });
    }
    catch (error) {
        res.status(500).send("Error generating report");
    }
});
exports.default = router;
