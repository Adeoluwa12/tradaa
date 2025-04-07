import { StockData, AnalyzedStock, TradeSignal } from '../types/indicators';
import { MACDService } from './macd.service';
import { RSIService } from './rsi.service';
import { PatternService } from './pattern.service';
import { WaveService } from './wave.service';
import { CycleService } from './cycle.service';
import { AutoPatternService } from './auto-pattern.service';

export class AnalysisService {
  static async analyzeStock(
    symbol: string,
    data: StockData[],
    timeframe: string
  ): Promise<AnalyzedStock> {
    const signals: TradeSignal[] = [
      ...MACDService.analyze(data),
      ...RSIService.analyze(data),
      ...PatternService.analyze(data),
      ...WaveService.analyze(data),
      ...CycleService.analyze(data),
      ...AutoPatternService.analyze(data)
    ];

    return {
      symbol,
      signals,
      finalRecommendation: this.calculateRecommendation(signals, timeframe)
    };
  }

  private static calculateRecommendation(
    signals: TradeSignal[],
    timeframe: string
  ): { direction: 'buy' | 'sell' | 'hold'; confidence: number; timeframe: string } {
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