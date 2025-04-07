import { Request, Response } from "express";
import { ReportService } from "../services/reportService";

export const getDailyReport = async (req: Request, res: Response) => {
    try {
        const stocks = await ReportService.fetchDailyStocks();
        const report = await ReportService.generateReport(stocks);
        res.render("report", { report });
    } catch (error) {
        res.status(500).send("Error generating report");
    }
};