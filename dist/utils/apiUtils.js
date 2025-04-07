"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchData = async (url) => {
    try {
        const response = await axios_1.default.get(url);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
exports.fetchData = fetchData;
