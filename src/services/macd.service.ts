import { StockData, TradeSignal, MACDResult, SignalStrength } from '../types/indicators';

export class MACDService {
  private static readonly FAST_PERIOD = 12;
  private static readonly SLOW_PERIOD = 26;
  private static readonly SIGNAL_PERIOD = 9;
  private static readonly DIVERGENCE_WINDOW = 14;

  static analyze(data: StockData[]): TradeSignal[] {
    const { macdLine, signalLine } = this.calculate(data);
    const signals: TradeSignal[] = [];
    
    // Crossovers
    for (let i = 1; i < macdLine.length; i++) {
      if (this.isBullishCrossover(macdLine, signalLine, i)) {
        signals.push(this.createSignal(
          'MACD Crossover',
          'buy',
          this.calculateCrossoverStrength(macdLine[i] - signalLine[i]),
          data[i].date
        ));
      } else if (this.isBearishCrossover(macdLine, signalLine, i)) {
        signals.push(this.createSignal(
          'MACD Crossover',
          'sell',
          this.calculateCrossoverStrength(signalLine[i] - macdLine[i]),
          data[i].date
        ));
      }
    }

    // Divergences
    signals.push(...this.findDivergences(data, macdLine));
    return signals;
  }

  private static isBullishCrossover(macd: number[], signal: number[], i: number): boolean {
    return macd[i] > signal[i] && macd[i-1] <= signal[i-1];
  }

  private static isBearishCrossover(macd: number[], signal: number[], i: number): boolean {
    return macd[i] < signal[i] && macd[i-1] >= signal[i-1];
  }

  private static findDivergences(data: StockData[], macdLine: number[]): TradeSignal[] {
    const signals: TradeSignal[] = [];
    const closes = data.map(d => d.close);

    for (let i = this.DIVERGENCE_WINDOW; i < data.length; i++) {
      const windowCloses = closes.slice(i - this.DIVERGENCE_WINDOW, i);
      const windowMacd = macdLine.slice(i - this.DIVERGENCE_WINDOW, i);
      
      if (this.hasBullishDivergence(windowCloses, windowMacd)) {
        signals.push(this.createSignal(
          'MACD Bullish Divergence',
          'buy',
          'strong',
          data[i].date,
          `Lower lows in price with higher lows in MACD`
        ));
      }

      if (this.hasBearishDivergence(windowCloses, windowMacd)) {
        signals.push(this.createSignal(
          'MACD Bearish Divergence',
          'sell',
          'strong',
          data[i].date,
          `Higher highs in price with lower highs in MACD`
        ));
      }
    }

    return signals;
  }

  private static hasBullishDivergence(closes: number[], macd: number[]): boolean {
    const lowestCloseIndex = this.findLowestIndex(closes);
    const lowestMacdIndex = this.findLowestIndex(macd);
    return lowestCloseIndex > lowestMacdIndex;
  }

  private static hasBearishDivergence(closes: number[], macd: number[]): boolean {
    const highestCloseIndex = this.findHighestIndex(closes);
    const highestMacdIndex = this.findHighestIndex(macd);
    return highestCloseIndex > highestMacdIndex;
  }

  private static findLowestIndex(values: number[]): number {
    return values.indexOf(Math.min(...values));
  }

  private static findHighestIndex(values: number[]): number {
    return values.indexOf(Math.max(...values));
  }

  static calculate(data: StockData[]): MACDResult {
    const closes = data.map(d => d.close);
    const ema12 = this.ema(closes, this.FAST_PERIOD);
    const ema26 = this.ema(closes, this.SLOW_PERIOD);
    
    const macdLine = ema12.map((val, i) => val - ema26[i]);
    const signalLine = this.ema(macdLine, this.SIGNAL_PERIOD);
    const histogram = macdLine.map((val, i) => val - signalLine[i]);

    return { macdLine, signalLine, histogram };
  }

  private static ema(data: number[], period: number): number[] {
    const k = 2 / (period + 1);
    const ema = [this.sma(data.slice(0, period))];
    
    for (let i = period; i < data.length; i++) {
      ema.push(data[i] * k + ema[i - period] * (1 - k));
    }
    
    return ema;
  }

  private static sma(data: number[]): number {
    return data.reduce((a, b) => a + b) / data.length;
  }

  private static calculateCrossoverStrength(value: number): SignalStrength {
    const absValue = Math.abs(value);
    if (absValue > 2) return 'very-strong';
    if (absValue > 1) return 'strong';
    if (absValue > 0.5) return 'moderate';
    if (absValue > 0.2) return 'weak';
    return 'very-weak';
  }

  private static createSignal(
    indicator: string,
    direction: 'buy' | 'sell',
    strength: SignalStrength,
    timestamp: Date,
    details = ''
  ): TradeSignal {
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


