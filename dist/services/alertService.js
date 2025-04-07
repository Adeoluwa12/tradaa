"use strict";
// import axios from "axios"
// import { NIGERIAN_STOCKS, US_STOCKS } from "../utils/stockList"
// import { sendEmail } from "../utils/mailUtils"
// import { Alert, type IAlert, type IAlertData } from "../model/alertModel"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertService = void 0;
// const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY
// export class AlertService {
//     static async fetchAlerts(): Promise<IAlert[]> {
//         const allStocks = [...NIGERIAN_STOCKS, ...US_STOCKS];
//         const alertsData: IAlertData[] = [];
//         for (const symbol of allStocks) {
//             const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
//             try {
//                 const response = await axios.get(url);
//                 console.log(`Response for ${symbol}:`, JSON.stringify(response.data, null, 2));
//                 const data = response.data["Time Series (Daily)"];
//                 if (!data) {
//                     console.error(`No "Time Series (Daily)" data found for ${symbol}`);
//                     continue;
//                 }
//                 const dates = Object.keys(data);
//                 if (dates.length < 2) {
//                     console.error(`Not enough data for ${symbol}`);
//                     continue;
//                 }
//                 const latestDate = dates[0];
//                 const previousDate = dates[1];
//                 if (!data[latestDate] || !data[previousDate]) {
//                     console.error(`Missing data for dates ${latestDate} or ${previousDate} for ${symbol}`);
//                     continue;
//                 }
//                 const latestPrice = parseFloat(data[latestDate]["4. close"]);
//                 const previousPrice = parseFloat(data[previousDate]["4. close"]);
//                 if (isNaN(latestPrice) || isNaN(previousPrice)) {
//                     console.error(`Invalid price data for ${symbol} on ${latestDate} or ${previousDate}`);
//                     continue;
//                 }
//                 const change = latestPrice - previousPrice;
//                 alertsData.push({
//                     symbol,
//                     change,
//                     date: new Date(latestDate),
//                 });
//             } catch (error) {
//                 console.error(`Error fetching data for ${symbol}:`, error);
//             }
//         }
//         // Save alerts to database
//         const savedAlerts = await Alert.insertMany(alertsData);
//         return savedAlerts;
//     }
//   static async getLatestAlerts(limit = 5): Promise<IAlert[]> {
//     return Alert.find().sort({ date: -1 }).limit(limit)
//   }
//   static async getAllAlerts(): Promise<IAlert[]> {
//     return Alert.find().sort({ date: -1 })
//   }
//   static async notifyUsers(alerts: IAlert[]): Promise<void> {
//     const alertMessages = alerts
//       .map((alert) => `${alert.symbol}: ${alert.change > 0 ? "↑" : "↓"} ${Math.abs(alert.change).toFixed(2)}`)
//       .join("\n")
//     await sendEmail({
//       to: process.env.EMAIL_RECIPIENTS,
//       subject: "Stock Alerts",
//       text: alertMessages,
//     })
//   }
// }
const axios_1 = __importDefault(require("axios"));
const stockList_1 = require("../utils/stockList");
const mailUtils_1 = require("../utils/mailUtils");
const alertModel_1 = require("../model/alertModel");
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
class AlertService {
    static async fetchAlerts() {
        const allStocks = [...stockList_1.NIGERIAN_STOCKS, ...stockList_1.US_STOCKS];
        const alertsData = [];
        for (const symbol of allStocks) {
            const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
            try {
                const response = await axios_1.default.get(url);
                // Check if we have valid data
                const data = response.data["Time Series (Daily)"];
                if (!data) {
                    console.error(`No "Time Series (Daily)" data found for ${symbol}`);
                    // Add fallback data to prevent N/A on dashboard
                    alertsData.push({
                        symbol,
                        change: 0,
                        date: new Date(),
                        fallback: true,
                    });
                    continue;
                }
                const dates = Object.keys(data).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
                if (dates.length < 2) {
                    console.error(`Not enough data for ${symbol}`);
                    // Add fallback data
                    alertsData.push({
                        symbol,
                        change: 0,
                        date: new Date(),
                        fallback: true,
                    });
                    continue;
                }
                const latestDate = dates[0];
                const previousDate = dates[1];
                if (!data[latestDate] || !data[previousDate]) {
                    console.error(`Missing data for dates ${latestDate} or ${previousDate} for ${symbol}`);
                    // Add fallback data
                    alertsData.push({
                        symbol,
                        change: 0,
                        date: new Date(),
                        fallback: true,
                    });
                    continue;
                }
                const latestPrice = Number.parseFloat(data[latestDate]["4. close"]);
                const previousPrice = Number.parseFloat(data[previousDate]["4. close"]);
                if (isNaN(latestPrice) || isNaN(previousPrice)) {
                    console.error(`Invalid price data for ${symbol} on ${latestDate} or ${previousDate}`);
                    // Add fallback data
                    alertsData.push({
                        symbol,
                        change: 0,
                        date: new Date(),
                        fallback: true,
                    });
                    continue;
                }
                const change = latestPrice - previousPrice;
                alertsData.push({
                    symbol,
                    change,
                    date: new Date(latestDate),
                    latestPrice,
                    previousPrice,
                });
            }
            catch (error) {
                console.error(`Error fetching data for ${symbol}:`, error);
                // Add fallback data
                alertsData.push({
                    symbol,
                    change: 0,
                    date: new Date(),
                    fallback: true,
                });
            }
        }
        // Save alerts to database
        const savedAlerts = await alertModel_1.Alert.insertMany(alertsData);
        return savedAlerts;
    }
    static async getLatestAlerts(limit = 5) {
        return alertModel_1.Alert.find().sort({ date: -1 }).limit(limit);
    }
    static async getAllAlerts() {
        return alertModel_1.Alert.find().sort({ date: -1 });
    }
    static async notifyUsers(alerts) {
        // Filter out fallback alerts
        const validAlerts = alerts.filter((alert) => !alert.fallback);
        if (validAlerts.length === 0) {
            console.log("No valid alerts to send");
            return;
        }
        const alertMessages = validAlerts
            .map((alert) => {
            const changeValue = Math.abs(alert.change).toFixed(2);
            const percentChange = alert.previousPrice ? ((alert.change / alert.previousPrice) * 100).toFixed(2) + "%" : "";
            return `${alert.symbol}: ${alert.change > 0 ? "↑" : "↓"} ${changeValue} ${percentChange}`;
        })
            .join("\n");
        await (0, mailUtils_1.sendEmail)({
            to: process.env.EMAIL_RECIPIENTS,
            subject: "Stock Alerts",
            text: alertMessages,
        });
    }
}
exports.AlertService = AlertService;
