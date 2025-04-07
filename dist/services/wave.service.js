"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaveService = void 0;
class WaveService {
    static analyze(data) {
        const signals = [];
        const closes = data.map(d => d.close);
        if (this.isImpulseWave(closes)) {
            signals.push({
                indicator: 'Elliot Wave',
                direction: 'buy',
                strength: 'strong',
                confidence: 75,
                details: 'Impulse wave (5-wave pattern) detected',
                timestamp: data[data.length - 1].date
            });
        }
        if (this.isCorrectiveWave(closes)) {
            signals.push({
                indicator: 'Elliot Wave',
                direction: 'sell',
                strength: 'moderate',
                confidence: 65,
                details: 'Corrective wave (ABC pattern) detected',
                timestamp: data[data.length - 1].date
            });
        }
        return signals;
    }
    static isImpulseWave(closes) {
        if (closes.length < 10)
            return false;
        // Simplified wave detection
        const changes = [];
        for (let i = 1; i < closes.length; i++) {
            changes.push(closes[i] - closes[i - 1]);
        }
        // Count wave segments
        let currentDirection = changes[0] > 0 ? 'up' : 'down';
        let waveCount = 1;
        for (const change of changes.slice(1)) {
            const newDirection = change > 0 ? 'up' : 'down';
            if (newDirection !== currentDirection) {
                waveCount++;
                currentDirection = newDirection;
            }
        }
        return waveCount >= 5;
    }
    static isCorrectiveWave(closes) {
        if (closes.length < 6)
            return false;
        // Look for ABC pattern
        const midPoint = Math.floor(closes.length / 2);
        const firstHalf = closes.slice(0, midPoint);
        const secondHalf = closes.slice(midPoint);
        const firstTrend = firstHalf[firstHalf.length - 1] - firstHalf[0];
        const secondTrend = secondHalf[secondHalf.length - 1] - secondHalf[0];
        return (firstTrend > 0 && secondTrend < 0) ||
            (firstTrend < 0 && secondTrend > 0);
    }
}
exports.WaveService = WaveService;
