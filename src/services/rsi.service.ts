import { SignalStrength, StockData, TradeSignal } from '../types/indicators';

export class RSIService {
  private static readonly PERIOD = 14;
  private static readonly OVERSOLD = 30;
  private static readonly OVERBOUGHT = 70;

  static analyze(data: StockData[]): TradeSignal[] {
    const rsiValues = this.calculateRSI(data);
    const signals: TradeSignal[] = [];

    for (let i = this.PERIOD; i < rsiValues.length; i++) {
      if (rsiValues[i] < this.OVERSOLD) {
        signals.push(this.createSignal(
          'RSI',
          'buy',
          this.calculateStrength(this.OVERSOLD - rsiValues[i]),
          data[i].date,
          `Oversold (${rsiValues[i].toFixed(2)})`
        ));
      } else if (rsiValues[i] > this.OVERBOUGHT) {
        signals.push(this.createSignal(
          'RSI',
          'sell',
          this.calculateStrength(rsiValues[i] - this.OVERBOUGHT),
          data[i].date,
          `Overbought (${rsiValues[i].toFixed(2)})`
        ));
      }
    }

    return signals;
  }

  private static calculateRSI(data: StockData[]): number[] {
    const closes = data.map(d => d.close);
    const gains: number[] = [];
    const losses: number[] = [];

    for (let i = 1; i < closes.length; i++) {
      const change = closes[i] - closes[i-1];
      gains.push(change > 0 ? change : 0);
      losses.push(change < 0 ? -change : 0);
    }

    const avgGain = this.rollingAverage(gains, this.PERIOD);
    const avgLoss = this.rollingAverage(losses, this.PERIOD);

    const rsi: number[] = [];
    for (let i = 0; i < avgGain.length; i++) {
      const rs = avgLoss[i] === 0 ? Infinity : avgGain[i] / avgLoss[i];
      rsi.push(100 - (100 / (1 + rs)));
    }

    return rsi;
  }

  private static rollingAverage(data: number[], period: number): number[] {
    const averages: number[] = [];
    let sum = data.slice(0, period).reduce((a, b) => a + b, 0);
    averages.push(sum / period);

    for (let i = period; i < data.length; i++) {
      sum = sum - data[i - period] + data[i];
      averages.push(sum / period);
    }

    return averages;
  }

  private static calculateStrength(distance: number): SignalStrength {
    if (distance > 30) return 'very-strong';
    if (distance > 20) return 'strong';
    if (distance > 10) return 'moderate';
    if (distance > 5) return 'weak';
    return 'very-weak';
  }

  private static createSignal(
    indicator: string,
    direction: 'buy' | 'sell',
    strength: SignalStrength,
    timestamp: Date,
    details: string
  ): TradeSignal {
    const confidenceMap = {
      'very-strong': 85,
      'strong': 70,
      'moderate': 55,
      'weak': 40,
      'very-weak': 25
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