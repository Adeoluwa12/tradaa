// src/routes/reportRoutes.ts
import express from "express";
import { ReportService } from "../services/reportService";
import { sendEmail } from "../utils/mailUtils";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const stocks = await ReportService.fetchDailyStocks();
        const report = await ReportService.generateReport(stocks);
        await sendEmail({
            to: "process.env.EMAIL_RECIPIENTS",
            subject: "Daily Stock Report",
            text: report,
        });
        res.render("report", { cssFile: "report", report });
    } catch (error) {
        res.status(500).send("Error generating report");
    }
});

export default router;