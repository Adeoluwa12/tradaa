"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CycleService = void 0;
class CycleService {
    static analyze(data) {
        const signals = [];
        const phase = this.detectMarketPhase(data);
        if (phase === 'accumulation') {
            signals.push(this.createSignal('Cycle Analysis', 'buy', 'moderate', data[data.length - 1].date, 'Accumulation phase detected'));
        }
        else if (phase === 'distribution') {
            signals.push(this.createSignal('Cycle Analysis', 'sell', 'moderate', data[data.length - 1].date, 'Distribution phase detected'));
        }
        return signals;
    }
    static detectMarketPhase(data) {
        if (data.length < this.CYCLE_LENGTH * 2)
            return 'neutral';
        const current = data.slice(-this.CYCLE_LENGTH);
        const previous = data.slice(-this.CYCLE_LENGTH * 2, -this.CYCLE_LENGTH);
        const currentVol = this.calculateVolatility(current);
        const previousVol = this.calculateVolatility(previous);
        if (currentVol < previousVol * 0.7 &&
            current[current.length - 1].close > current[0].close) {
            return 'accumulation';
        }
        if (currentVol > previousVol * 1.3 &&
            current[current.length - 1].close < current[0].close) {
            return 'distribution';
        }
        return 'neutral';
    }
    static calculateVolatility(data) {
        const closes = data.map(d => d.close);
        const mean = closes.reduce((a, b) => a + b) / closes.length;
        const variance = closes.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / closes.length;
        return Math.sqrt(variance);
    }
    static createSignal(indicator, direction, strength, timestamp, details) {
        const confidenceMap = {
            'very-strong': 80,
            'strong': 70,
            'moderate': 60,
            'weak': 50,
            'very-weak': 40
        };
        return {
            indicator,
            direction,
            strength,
            confidence: confidenceMap[strength],
            details,
            timestamp
        };
    }
}
exports.CycleService = CycleService;
CycleService.CYCLE_LENGTH = 20; // Days
