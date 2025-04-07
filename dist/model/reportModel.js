"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reportSchema = new mongoose_1.default.Schema({
    date: { type: Date, default: Date.now },
    content: { type: String, required: true },
});
exports.Report = mongoose_1.default.model("Report", reportSchema);
