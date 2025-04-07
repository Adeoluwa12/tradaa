import { Request, Response } from "express";
import { StockService } from "../services/stockService";

export const getStockChart = async (req: Request, res: Response) => {
    const { symbol } = req.params;
    try {
        const chartData = await StockService.fetchStockData(symbol);
        res.render("dashboard", { chartData });
    } catch (error) {
        res.status(500).send("Error fetching stock chart");
    }
};