"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MACDService = void 0;
class MACDService {
    static analyze(data) {
        const { macdLine, signalLine } = this.calculate(data);
        const signals = [];
        // Crossovers
        for (let i = 1; i < macdLine.length; i++) {
            if (this.isBullishCrossover(macdLine, signalLine, i)) {
                signals.push(this.createSignal('MACD Crossover', 'buy', this.calculateCrossoverStrength(macdLine[i] - signalLine[i]), data[i].date));
            }
            else if (this.isBearishCrossover(macdLine, signalLine, i)) {
                signals.push(this.createSignal('MACD Crossover', 'sell', this.calculateCrossoverStrength(signalLine[i] - macdLine[i]), data[i].date));
            }
        }
        // Divergences
        signals.push(...this.findDivergences(data, macdLine));
        return signals;
    }
    static isBullishCrossover(macd, signal, i) {
        return macd[i] > signal[i] && macd[i - 1] <= signal[i - 1];
    }
    static isBearishCrossover(macd, signal, i) {
        return macd[i] < signal[i] && macd[i - 1] >= signal[i - 1];
    }
    static findDivergences(data, macdLine) {
        const signals = [];
        const closes = data.map(d => d.close);
        for (let i = this.DIVERGENCE_WINDOW; i < data.length; i++) {
            const windowCloses = closes.slice(i - this.DIVERGENCE_WINDOW, i);
            const windowMacd = macdLine.slice(i - this.DIVERGENCE_WINDOW, i);
            if (this.hasBullishDivergence(windowCloses, windowMacd)) {
                signals.push(this.createSignal('MACD Bullish Divergence', 'buy', 'strong', data[i].date, `Lower lows in price with higher lows in MACD`));
            }
            if (this.hasBearishDivergence(windowCloses, windowMacd)) {
                signals.push(this.createSignal('MACD Bearish Divergence', 'sell', 'strong', data[i].date, `Higher highs in price with lower highs in MACD`));
            }
        }
        return signals;
    }
    static hasBullishDivergence(closes, macd) {
        const lowestCloseIndex = this.findLowestIndex(closes);
        const lowestMacdIndex = this.findLowestIndex(macd);
        return lowestCloseIndex > lowestMacdIndex;
    }
    static hasBearishDivergence(closes, macd) {
        const highestCloseIndex = this.findHighestIndex(closes);
        const highestMacdIndex = this.findHighestIndex(macd);
        return highestCloseIndex > highestMacdIndex;
    }
    static findLowestIndex(values) {
        return values.indexOf(Math.min(...values));
    }
    static findHighestIndex(values) {
        return values.indexOf(Math.max(...values));
    }
    static calculate(data) {
        const closes = data.map(d => d.close);
        const ema12 = this.ema(closes, this.FAST_PERIOD);
        const ema26 = this.ema(closes, this.SLOW_PERIOD);
        const macdLine = ema12.map((val, i) => val - ema26[i]);
        const signalLine = this.ema(macdLine, this.SIGNAL_PERIOD);
        const histogram = macdLine.map((val, i) => val - signalLine[i]);
        return { macdLine, signalLine, histogram };
    }
    static ema(data, period) {
        const k = 2 / (period + 1);
        const ema = [this.sma(data.slice(0, period))];
        for (let i = period; i < data.length; i++) {
            ema.push(data[i] * k + ema[i - period] * (1 - k));
        }
        return ema;
    }
    static sma(data) {
        return data.reduce((a, b) => a + b) / data.length;
    }
    static calculateCrossoverStrength(value) {
        const absValue = Math.abs(value);
        if (absValue > 2)
            return 'very-strong';
        if (absValue > 1)
            return 'strong';
        if (absValue > 0.5)
            return 'moderate';
        if (absValue > 0.2)
            return 'weak';
        return 'very-weak';
    }
    static createSignal(indicator, direction, strength, timestamp, details = '') {
        const confidenceMap = {
            'very-strong': 90,
            'strong': 75,
            'moderate': 60,
            'weak': 45,
            'very-weak': 30
        };
        return {
            indicator,
            direction,
            strength,
            confidence: confidenceMap[strength],
            details: details || `${indicator} ${direction} signal`,
            timestamp
        };
    }
}
exports.MACDService = MACDService;
MACDService.FAST_PERIOD = 12;
MACDService.SLOW_PERIOD = 26;
MACDService.SIGNAL_PERIOD = 9;
MACDService.DIVERGENCE_WINDOW = 14;
