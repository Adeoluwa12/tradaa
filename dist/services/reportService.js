"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
// src/services/ReportService.ts
const axios_1 = __importDefault(require("axios"));
const stockList_1 = require("../utils/stockList");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
class ReportService {
    static async fetchDailyStocks() {
        const symbols = [...stockList_1.NIGERIAN_STOCKS, ...stockList_1.US_STOCKS];
        const stocksData = [];
        for (const symbol of symbols) {
            const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
            try {
                const response = await axios_1.default.get(url);
                const data = response.data["Time Series (Daily)"];
                if (data) {
                    const latestDate = Object.keys(data)[0];
                    const latestPrice = parseFloat(data[latestDate]["4. close"]);
                    stocksData.push({ symbol, price: latestPrice });
                }
            }
            catch (error) {
                console.error(`Error fetching data for ${symbol}:`, error);
            }
        }
        return stocksData;
    }
    static async generateReport(stocks) {
        const prompt = `Generate a daily stock report for the following stocks, please ensure the report is well structured and easy to understand, add a summary at the end using bulletpoints for major and key updates: ${stocks.map(stock => `${stock.symbol}: $${stock.price.toFixed(2)}`).join(", ")}.`;
        try {
            const response = await axios_1.default.post("https://api.openai.com/v1/completions", {
                model: "gpt-4",
                prompt,
                max_tokens: 500,
            }, {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
            });
            return response.data.choices[0].text;
        }
        catch (error) {
            console.error("Error generating report:", error);
            throw new Error("Failed to generate report");
        }
    }
}
exports.ReportService = ReportService;
