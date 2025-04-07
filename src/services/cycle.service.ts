import { SignalStrength, StockData, TradeSignal } from '../types/indicators';

export class CycleService {
  private static readonly CYCLE_LENGTH = 20; // Days

  static analyze(data: StockData[]): TradeSignal[] {
    const signals: TradeSignal[] = [];
    const phase = this.detectMarketPhase(data);

    if (phase === 'accumulation') {
      signals.push(this.createSignal(
        'Cycle Analysis',
        'buy',
        'moderate',
        data[data.length - 1].date,
        'Accumulation phase detected'
      ));
    } else if (phase === 'distribution') {
      signals.push(this.createSignal(
        'Cycle Analysis',
        'sell',
        'moderate',
        data[data.length - 1].date,
        'Distribution phase detected'
      ));
    }

    return signals;
  }

  private static detectMarketPhase(data: StockData[]): string {
    if (data.length < this.CYCLE_LENGTH * 2) return 'neutral';

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

  private static calculateVolatility(data: StockData[]): number {
    const closes = data.map(d => d.close);
    const mean = closes.reduce((a, b) => a + b) / closes.length;
    const variance = closes.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / closes.length;
    return Math.sqrt(variance);
  }

  private static createSignal(
    indicator: string,
    direction: 'buy' | 'sell',
    strength: SignalStrength,
    timestamp: Date,
    details: string
  ): TradeSignal {
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