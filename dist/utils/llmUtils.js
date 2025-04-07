"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReport = exports.generateReportPrompt = void 0;
const axios_1 = __importDefault(require("axios"));
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const generateReportPrompt = (stocks) => {
    const stockSummary = stocks.map(stock => `${stock.symbol}: ${stock.price}`).join(", ");
    return `Generate a daily stock report for the following stocks: ${stockSummary}.`;
};
exports.generateReportPrompt = generateReportPrompt;
const generateReport = async (prompt) => {
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
};
exports.generateReport = generateReport;
