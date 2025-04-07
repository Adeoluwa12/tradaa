"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStockChart = void 0;
const stockService_1 = require("../services/stockService");
const getStockChart = async (req, res) => {
    const { symbol } = req.params;
    try {
        const chartData = await stockService_1.StockService.fetchStockData(symbol);
        res.render("dashboard", { chartData });
    }
    catch (error) {
        res.status(500).send("Error fetching stock chart");
    }
};
exports.getStockChart = getStockChart;
