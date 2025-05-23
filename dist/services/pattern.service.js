"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternService = void 0;
class PatternService {
    static analyze(data) {
        return [
            ...this.checkHeadAndShoulders(data),
            ...this.checkDoubleTopsBottoms(data),
            ...this.checkTriangles(data),
            ...this.checkFlags(data),
            ...this.checkCupAndHandle(data)
        ];
    }
    static checkHeadAndShoulders(data) {
        const signals = [];
        const closes = data.map(d => d.close);
        const peaks = this.findPeaks(closes);
        for (let i = 2; i < peaks.length; i++) {
            const [left, head, right] = [peaks[i - 2], peaks[i - 1], peaks[i]];
            if (head.value > left.value && head.value > right.value) {
                const neckline = this.calculateNeckline(data, left.index, right.index);
                if (this.isValidNeckline(neckline)) {
                    signals.push(this.createSignal('Head and Shoulders', 'sell', 'strong', data[right.index].date, `Neckline at ${neckline.toFixed(2)}`));
                }
            }
        }
        return signals;
    }
    static checkDoubleTopsBottoms(data) {
        const signals = [];
        const closes = data.map(d => d.close);
        const peaks = this.findPeaks(closes);
        const troughs = this.findTroughs(closes);
        // Double Top detection
        for (let i = 1; i < peaks.length; i++) {
            const [first, second] = [peaks[i - 1], peaks[i]];
            if (this.isSimilarHeight(first.value, second.value) &&
                this.isValidRetrace(data, first.index, second.index)) {
                signals.push(this.createSignal('Double Top', 'sell', 'moderate', data[second.index].date));
            }
        }
        // Double Bottom detection
        for (let i = 1; i < troughs.length; i++) {
            const [first, second] = [troughs[i - 1], troughs[i]];
            if (this.isSimilarHeight(first.value, second.value) &&
                this.isValidRetrace(data, first.index, second.index)) {
                signals.push(this.createSignal('Double Bottom', 'buy', 'moderate', data[second.index].date));
            }
        }
        return signals;
    }
    static checkTriangles(data) {
        const signals = [];
        const closes = data.map(d => d.close);
        // Need at least 5 points to detect a triangle
        if (closes.length < 5)
            return signals;
        for (let i = 4; i < closes.length; i++) {
            const segment = closes.slice(i - 4, i + 1);
            const highs = this.getSegmentHighs(segment);
            const lows = this.getSegmentLows(segment);
            const highSlope = (highs[4] - highs[0]) / 4;
            const lowSlope = (lows[4] - lows[0]) / 4;
            // Ascending Triangle
            if (Math.abs(highSlope) < 0.01 && lowSlope > 0.01) {
                signals.push(this.createSignal('Ascending Triangle', 'buy', 'moderate', data[i].date, 'Higher lows with consistent resistance'));
            }
            // Descending Triangle
            else if (highSlope < -0.01 && Math.abs(lowSlope) < 0.01) {
                signals.push(this.createSignal('Descending Triangle', 'sell', 'moderate', data[i].date, 'Lower highs with consistent support'));
            }
            // Symmetrical Triangle
            else if (Math.abs(highSlope + lowSlope) < 0.02 &&
                Math.abs(highSlope) > 0.01 &&
                highSlope < 0 && lowSlope > 0) {
                signals.push(this.createSignal('Symmetrical Triangle', closes[i] > closes[i - 1] ? 'buy' : 'sell', 'moderate', data[i].date, 'Converging trend lines'));
            }
        }
        return signals;
    }
    static checkFlags(data) {
        const signals = [];
        const closes = data.map(d => d.close);
        // Need at least 10 points to detect a flag
        if (closes.length < 10)
            return signals;
        for (let i = 9; i < closes.length; i++) {
            const poleSegment = closes.slice(i - 9, i - 4);
            const flagSegment = closes.slice(i - 4, i + 1);
            const poleSlope = (poleSegment[4] - poleSegment[0]) / 4;
            const flagSlope = (flagSegment[4] - flagSegment[0]) / 4;
            // Bull Flag
            if (poleSlope > 0.02 && Math.abs(flagSlope) < 0.01) {
                signals.push(this.createSignal('Bull Flag', 'buy', 'strong', data[i].date, 'Sharp rise followed by consolidation'));
            }
            // Bear Flag
            else if (poleSlope < -0.02 && Math.abs(flagSlope) < 0.01) {
                signals.push(this.createSignal('Bear Flag', 'sell', 'strong', data[i].date, 'Sharp drop followed by consolidation'));
            }
        }
        return signals;
    }
    static checkCupAndHandle(data) {
        const signals = [];
        const closes = data.map(d => d.close);
        // Need at least 20 points to detect cup and handle
        if (closes.length < 20)
            return signals;
        for (let i = 19; i < closes.length; i++) {
            const cupSegment = closes.slice(i - 19, i - 5);
            const handleSegment = closes.slice(i - 5, i + 1);
            const cupDepth = Math.max(...cupSegment) - Math.min(...cupSegment);
            const cupRetrace = (cupSegment[14] - Math.min(...cupSegment)) / cupDepth;
            const handleDepth = Math.max(...handleSegment) - Math.min(...handleSegment);
            const handleSlope = (handleSegment[5] - handleSegment[0]) / 5;
            if (cupDepth > 0.1 * Math.max(...cupSegment) && // Significant cup depth
                cupRetrace > 0.5 && cupRetrace < 0.7 && // Proper cup retrace
                handleDepth < 0.3 * cupDepth && // Handle smaller than cup
                handleSlope > -0.01 && handleSlope < 0.01) { // Flat handle
                signals.push(this.createSignal('Cup and Handle', 'buy', 'strong', data[i].date, 'Bullish continuation pattern'));
            }
        }
        return signals;
    }
    static getSegmentHighs(segment) {
        return segment.map((_, idx) => Math.max(...segment.slice(0, idx + 1)));
    }
    static getSegmentLows(segment) {
        return segment.map((_, idx) => Math.min(...segment.slice(0, idx + 1)));
    }
    static findPeaks(values) {
        const peaks = [];
        for (let i = 1; i < values.length - 1; i++) {
            if (values[i] > values[i - 1] && values[i] > values[i + 1]) {
                peaks.push({ index: i, value: values[i] });
            }
        }
        return peaks;
    }
    static findTroughs(values) {
        const troughs = [];
        for (let i = 1; i < values.length - 1; i++) {
            if (values[i] < values[i - 1] && values[i] < values[i + 1]) {
                troughs.push({ index: i, value: values[i] });
            }
        }
        return troughs;
    }
    static isSimilarHeight(a, b, threshold = 0.03) {
        return Math.abs(a - b) / ((a + b) / 2) < threshold;
    }
    static calculateNeckline(data, left, right) {
        const lows = data.slice(left, right + 1).map(d => d.low);
        return lows.reduce((a, b) => a + b, 0) / lows.length;
    }
    static isValidNeckline(neckline, threshold = 0.02) {
        // Simplified implementation - would normally check for flatness
        return true;
    }
    static isValidRetrace(data, start, end) {
        const retrace = this.calculateRetrace(data, start, end);
        return retrace > 0.3 && retrace < 0.7; // Fibonacci retracement levels
    }
    static calculateRetrace(data, start, end) {
        const move = data[end].high - data[start].high;
        const retrace = data[start].high - Math.min(...data.slice(start, end + 1).map(d => d.low));
        return retrace / move;
    }
    static createSignal(pattern, direction, strength, timestamp, details = '') {
        const confidenceMap = {
            'very-strong': 90,
            'strong': 75,
            'moderate': 60,
            'weak': 45,
            'very-weak': 30
        };
        return {
            indicator: `Pattern: ${pattern}`,
            direction,
            strength,
            confidence: confidenceMap[strength],
            details: details || `${pattern} pattern detected`,
            timestamp
        };
    }
}
exports.PatternService = PatternService;
