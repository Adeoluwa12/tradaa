import { StockData, TradeSignal } from '../types/indicators';
import { PatternService } from './pattern.service';

export class AutoPatternService {
  static analyze(data: StockData[]): TradeSignal[] {
    const allPatterns = PatternService.analyze(data);
    return allPatterns
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3); // Return top 3 most confident patterns
  }
}