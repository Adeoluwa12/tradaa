export interface StockData {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }
  
  export type SignalStrength = 
    | 'very-strong' | 'strong' | 'moderate' | 'weak' | 'very-weak';
  
  export interface TradeSignal {
    indicator: string;
    direction: 'buy' | 'sell' | 'neutral';
    strength: SignalStrength;
    confidence: number;
    details: string;
    timestamp: Date;
  }
  
  export interface AnalyzedStock {
    symbol: string;
    signals: TradeSignal[];
    finalRecommendation: {
      direction: 'buy' | 'sell' | 'hold';
      confidence: number;
      timeframe: string;
    };
  }
  
  export interface MACDResult {
    macdLine: number[];
    signalLine: number[];
    histogram: number[];
  }