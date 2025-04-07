"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDailyReport = void 0;
const reportService_1 = require("../services/reportService");
const getDailyReport = async (req, res) => {
    try {
        const stocks = await reportService_1.ReportService.fetchDailyStocks();
        const report = await reportService_1.ReportService.generateReport(stocks);
        res.render("report", { report });
    }
    catch (error) {
        res.status(500).send("Error generating report");
    }
};
exports.getDailyReport = getDailyReport;
