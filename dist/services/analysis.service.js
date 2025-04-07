"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisService = void 0;
const macd_service_1 = require("./macd.service");
const rsi_service_1 = require("./rsi.service");
const pattern_service_1 = require("./pattern.service");
const wave_service_1 = require("./wave.service");
const cycle_service_1 = require("./cycle.service");
const auto_pattern_service_1 = require("./auto-pattern.service");
class AnalysisService {
    static async analyzeStock(symbol, data, timeframe) {
        const signals = [
            ...macd_service_1.MACDService.analyze(data),
            ...rsi_service_1.RSIService.analyze(data),
            ...pattern_service_1.PatternService.analyze(data),
            ...wave_service_1.WaveService.analyze(data),
            ...cycle_service_1.CycleService.analyze(data),
            ...auto_pattern_service_1.AutoPatternService.analyze(data)
        ];
        return {
            symbol,
            signals,
            finalRecommendation: this.calculateRecommendation(signals, timeframe)
        };
    }
    static calculateRecommendation(signals, timeframe) {
        const buyScore = signals
            .filter(s => s.direction === 'buy')
            .reduce((sum, s) => sum + s.confidence, 0);
        const sellScore = signals
            .filter(s => s.direction === 'sell')
            .reduce((sum, s) => sum + s.confidence, 0);
        const netScore = buyScore - sellScore;
        const maxPossible = Math.max(1, signals.length * 100);
        const confidence = Math.min(100, Math.round((Math.abs(netScore) / maxPossible) * 100));
        return {
            direction: netScore > 20 ? 'buy' : netScore < -20 ? 'sell' : 'hold',
            confidence,
            timeframe
        };
    }
}
exports.AnalysisService = AnalysisService;
