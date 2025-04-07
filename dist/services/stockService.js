"use strict";
// import { NIGERIAN_STOCKS, US_STOCKS, CRYPTO_STOCKS } from "../utils/stockList"
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockService = void 0;
// export class StockService {
//   // Fetch stock data with timeframe support
//   static async fetchStockData(symbol: string, timeframe: string = 'daily'): Promise<any> {
//     // Generate more varied stock data based on the symbol to ensure different results
//     const basePrice = ((symbol.charCodeAt(0) + symbol.charCodeAt(symbol.length - 1)) % 100) + 100
//     const volatility = (symbol.length % 5) + 1
//     const stockData = []
//     let currentPrice = basePrice
//     // Determine the number of data points and time interval based on timeframe
//     const dataPoints = timeframe === 'weekly' ? 52 : 30; // 52 weeks or 30 days
//     const timeInterval = timeframe === 'weekly' ? 7 * 86400000 : 86400000; // 7 days or 1 day in milliseconds
//     for (let i = 0; i < dataPoints; i++) {
//       // Create more realistic price movements
//       const change = (Math.random() - 0.48) * volatility // Slight upward bias
//       currentPrice += change
//       const high = currentPrice + Math.random() * volatility
//       const low = currentPrice - Math.random() * volatility
//       const volume = Math.floor(1000 + Math.random() * 5000)
//       stockData.push({
//         date: new Date(Date.now() - (dataPoints - i) * timeInterval),
//         open: currentPrice - change,
//         close: currentPrice,
//         high: high,
//         low: low,
//         volume: volume,
//       })
//     }
//     return stockData
//   }
//   // Analyze all stocks and categorize them based on indicators
//   static async analyzeAllStocks(timeframe: string = 'daily'): Promise<any> {
//     const allStocks = [...NIGERIAN_STOCKS, ...US_STOCKS]
//     const results = []
//     for (const symbol of allStocks) {
//       const stockData = await this.fetchStockData(symbol, timeframe)
//       // Calculate technical indicators
//       const indicators = [
//         { name: "Auto Chart Patterns", result: this.checkAutoChartPatterns(stockData) },
//         { name: "Elliot Wave", result: this.checkElliotWave(stockData) },
//         { name: "MACD Divergence", result: this.checkMACDDivergence(stockData) },
//         { name: "Cycles Analysis", result: this.checkCyclesAnalysis(stockData) },
//         { name: "All Chart Patterns", result: this.checkAllChartPatterns(stockData) },
//       ]
//       // Count the number of fulfilled indicators
//       const fulfilledIndicators = indicators.filter((ind) => ind.result).length
//       // Determine the category
//       let category, recommendation;
//       if (fulfilledIndicators >= 4) {
//         category = "Very Strong";
//         recommendation = "Strong Buy";
//       } else if (fulfilledIndicators === 3) {
//         category = "Strong";
//         recommendation = "Buy";
//       } else if (fulfilledIndicators === 2) {
//         category = "Solid";
//         recommendation = "Hold";
//       } else if (fulfilledIndicators === 1) {
//         category = "Weak";
//         recommendation = "Strong Sell";
//       } else {
//         category = "Very Weak";
//         recommendation = "Very Strong Sell";
//       }
//       // Add the stock's result to the results array
//       results.push({
//         symbol,
//         indicators: indicators.map((ind) => ({ name: ind.name, result: ind.result })),
//         category,
//         recommendation,
//         fulfilledCount: fulfilledIndicators,
//         timeframe,
//       })
//     }
//     return results
//   }
//   // Indicator 1: Check for Auto Chart Patterns (looking for bullish patterns)
//   private static checkAutoChartPatterns(data: any): boolean {
//     // Check for bullish patterns like double bottom, cup and handle, etc.
//     // Check for double bottom pattern
//     const hasDoubleBottom = this.checkDoubleBottom(data)
//     // Check for bullish engulfing pattern
//     const hasBullishEngulfing = this.checkBullishEngulfing(data)
//     // Check for cup and handle pattern
//     const hasCupAndHandle = this.checkCupAndHandle(data)
//     return hasDoubleBottom || hasBullishEngulfing || hasCupAndHandle
//   }
//   // Indicator 5: Check All Chart Patterns (The Eccentric Trader)
//   private static checkAllChartPatterns(data: any): boolean {
//     if (data.length < 15) return false;
//     // Check for multiple chart patterns and return true if any are found
//     const patterns = [
//       this.checkHeadAndShoulders(data),
//       this.checkInverseHeadAndShoulders(data),
//       this.checkDoubleTop(data),
//       this.checkDoubleBottom(data),
//       this.checkTripleTop(data),
//       this.checkTripleBottom(data),
//       this.checkAscendingTriangle(data),
//       this.checkDescendingTriangle(data),
//       this.checkSymmetricalTriangle(data),
//       this.checkBullFlag(data),
//       this.checkBearFlag(data)
//     ];
//     // Return true if at least one pattern is detected
//     return patterns.some(pattern => pattern);
//   }
//   // Head and Shoulders pattern detection
//   private static checkHeadAndShoulders(data: any): boolean {
//     if (data.length < 20) return false;
//     // Find peaks (potential shoulders and head)
//     const peaks = [];
//     for (let i = 2; i < data.length - 2; i++) {
//       if (data[i].high > data[i-1].high && 
//           data[i].high > data[i-2].high && 
//           data[i].high > data[i+1].high && 
//           data[i].high > data[i+2].high) {
//         peaks.push({ index: i, value: data[i].high });
//       }
//     }
//     // Need at least 3 peaks for head and shoulders
//     if (peaks.length < 3) return false;
//     // Analyze consecutive groups of 3 peaks
//     for (let i = 0; i < peaks.length - 2; i++) {
//       const leftShoulder = peaks[i];
//       const head = peaks[i+1];
//       const rightShoulder = peaks[i+2];
//       // Check if the middle peak (head) is higher than the two shoulders
//       if (head.value > leftShoulder.value && head.value > rightShoulder.value) {
//         // Check if the shoulders are at similar heights (within 5%)
//         const shoulderDiff = Math.abs(leftShoulder.value - rightShoulder.value);
//         const avgShoulderHeight = (leftShoulder.value + rightShoulder.value) / 2;
//         const shoulderHeightDiffPercent = (shoulderDiff / avgShoulderHeight) * 100;
//         if (shoulderHeightDiffPercent < 10) {
//           // Check for a neckline (support level connecting the lows between peaks)
//           const leftTrough = this.findLowestBetween(data, leftShoulder.index, head.index);
//           const rightTrough = this.findLowestBetween(data, head.index, rightShoulder.index);
//           // If troughs are at similar levels, we have a potential neckline
//           const troughDiff = Math.abs(data[leftTrough].low - data[rightTrough].low);
//           const avgTroughHeight = (data[leftTrough].low + data[rightTrough].low) / 2;
//           const troughHeightDiffPercent = (troughDiff / avgTroughHeight) * 100;
//           if (troughHeightDiffPercent < 5) {
//             return true;
//           }
//         }
//       }
//     }
//     return false;
//   }
//   // Inverse Head and Shoulders pattern detection
//   private static checkInverseHeadAndShoulders(data: any): boolean {
//     if (data.length < 20) return false;
//     // Find troughs (potential shoulders and head)
//     const troughs = [];
//     for (let i = 2; i < data.length - 2; i++) {
//       if (data[i].low < data[i-1].low && 
//           data[i].low < data[i-2].low && 
//           data[i].low < data[i+1].low && 
//           data[i].low < data[i+2].low) {
//         troughs.push({ index: i, value: data[i].low });
//       }
//     }
//     // Need at least 3 troughs for inverse head and shoulders
//     if (troughs.length < 3) return false;
//     // Analyze consecutive groups of 3 troughs
//     for (let i = 0; i < troughs.length - 2; i++) {
//       const leftShoulder = troughs[i];
//       const head = troughs[i+1];
//       const rightShoulder = troughs[i+2];
//       // Check if the middle trough (head) is lower than the two shoulders
//       if (head.value < leftShoulder.value && head.value < rightShoulder.value) {
//         // Check if the shoulders are at similar heights (within 5%)
//         const shoulderDiff = Math.abs(leftShoulder.value - rightShoulder.value);
//         const avgShoulderHeight = (leftShoulder.value + rightShoulder.value) / 2;
//         const shoulderHeightDiffPercent = (shoulderDiff / avgShoulderHeight) * 100;
//         if (shoulderHeightDiffPercent < 10) {
//           // Check for a neckline (resistance level connecting the highs between troughs)
//           const leftPeak = this.findHighestBetween(data, leftShoulder.index, head.index);
//           const rightPeak = this.findHighestBetween(data, head.index, rightShoulder.index);
//           // If peaks are at similar levels, we have a potential neckline
//           const peakDiff = Math.abs(data[leftPeak].high - data[rightPeak].high);
//           const avgPeakHeight = (data[leftPeak].high + data[rightPeak].high) / 2;
//           const peakHeightDiffPercent = (peakDiff / avgPeakHeight) * 100;
//           if (peakHeightDiffPercent < 5) {
//             return true;
//           }
//         }
//       }
//     }
//     return false;
//   }
//   // Double Top pattern detection
//   private static checkDoubleTop(data: any): boolean {
//     if (data.length < 15) return false;
//     // Find peaks
//     const peaks = [];
//     for (let i = 2; i < data.length - 2; i++) {
//       if (data[i].high > data[i-1].high && 
//           data[i].high > data[i-2].high && 
//           data[i].high > data[i+1].high && 
//           data[i].high > data[i+2].high) {
//         peaks.push({ index: i, value: data[i].high });
//       }
//     }
//     // Need at least 2 peaks for double top
//     if (peaks.length < 2) return false;
//     // Check for double top pattern (two similar peaks with a significant trough between)
//     for (let i = 0; i < peaks.length - 1; i++) {
//       for (let j = i + 1; j < peaks.length; j++) {
//         // Check if peaks are at similar heights (within 3%)
//         const peakDiff = Math.abs(peaks[i].value - peaks[j].value);
//         const avgPeakHeight = (peaks[i].value + peaks[j].value) / 2;
//         const peakHeightDiffPercent = (peakDiff / avgPeakHeight) * 100;
//         // If peaks are similar in height and at least 5 bars apart
//         if (peakHeightDiffPercent < 3 && Math.abs(peaks[j].index - peaks[i].index) > 5) {
//           // Check for a significant trough between the peaks
//           const troughIndex = this.findLowestBetween(data, peaks[i].index, peaks[j].index);
//           const trough = data[troughIndex].low;
//           // Calculate the depth of the trough relative to the peaks
//           const troughDepth = avgPeakHeight - trough;
//           const troughDepthPercent = (troughDepth / avgPeakHeight) * 100;
//           // If trough is deep enough, we have a double top
//           if (troughDepthPercent > 3) {
//             return true;
//           }
//         }
//       }
//     }
//     return false;
//   }
//   // Double Bottom pattern - already implemented in your original code, but I'll make it consistent with the other patterns
//   private static checkDoubleBottom(data: any): boolean {
//     if (data.length < 15) return false;
//     // Find troughs
//     const troughs = [];
//     for (let i = 2; i < data.length - 2; i++) {
//       if (data[i].low < data[i-1].low && 
//           data[i].low < data[i-2].low && 
//           data[i].low < data[i+1].low && 
//           data[i].low < data[i+2].low) {
//         troughs.push({ index: i, value: data[i].low });
//       }
//     }
//     // Need at least 2 troughs for double bottom
//     if (troughs.length < 2) return false;
//     // Check for double bottom pattern (two similar troughs with a significant peak between)
//     for (let i = 0; i < troughs.length - 1; i++) {
//       for (let j = i + 1; j < troughs.length; j++) {
//         // Check if troughs are at similar heights (within 3%)
//         const troughDiff = Math.abs(troughs[i].value - troughs[j].value);
//         const avgTroughHeight = (troughs[i].value + troughs[j].value) / 2;
//         const troughHeightDiffPercent = (troughDiff / avgTroughHeight) * 100;
//         // If troughs are similar in height and at least 5 bars apart
//         if (troughHeightDiffPercent < 3 && Math.abs(troughs[j].index - troughs[i].index) > 5) {
//           // Check for a significant peak between the troughs
//           const peakIndex = this.findHighestBetween(data, troughs[i].index, troughs[j].index);
//           const peak = data[peakIndex].high;
//           // Calculate the height of the peak relative to the troughs
//           const peakHeight = peak - avgTroughHeight;
//           const peakHeightPercent = (peakHeight / avgTroughHeight) * 100;
//           // If peak is high enough, we have a double bottom
//           if (peakHeightPercent > 3) {
//             return true;
//           }
//         }
//       }
//     }
//     return false;
//   }
//   // Triple Top pattern detection
//   private static checkTripleTop(data: any): boolean {
//     if (data.length < 20) return false;
//     // Find peaks
//     const peaks = [];
//     for (let i = 2; i < data.length - 2; i++) {
//       if (data[i].high > data[i-1].high && 
//           data[i].high > data[i-2].high && 
//           data[i].high > data[i+1].high && 
//           data[i].high > data[i+2].high) {
//         peaks.push({ index: i, value: data[i].high });
//       }
//     }
//     // Need at least 3 peaks for triple top
//     if (peaks.length < 3) return false;
//     // Check for triple top pattern (three similar peaks)
//     for (let i = 0; i < peaks.length - 2; i++) {
//       // Check if all three peaks are at similar heights (within 3%)
//       const peak1 = peaks[i].value;
//       const peak2 = peaks[i+1].value;
//       const peak3 = peaks[i+2].value;
//       const maxPeak = Math.max(peak1, peak2, peak3);
//       const minPeak = Math.min(peak1, peak2, peak3);
//       const avgPeak = (peak1 + peak2 + peak3) / 3;
//       const peakDiffPercent = ((maxPeak - minPeak) / avgPeak) * 100;
//       // If peaks are similar and properly spaced
//       if (peakDiffPercent < 5 && 
//           (peaks[i+1].index - peaks[i].index) > 3 && 
//           (peaks[i+2].index - peaks[i+1].index) > 3) {
//         return true;
//       }
//     }
//     return false;
//   }
//   // Triple Bottom pattern detection
//   private static checkTripleBottom(data: any): boolean {
//     if (data.length < 20) return false;
//     // Find troughs
//     const troughs = [];
//     for (let i = 2; i < data.length - 2; i++) {
//       if (data[i].low < data[i-1].low && 
//           data[i].low < data[i-2].low && 
//           data[i].low < data[i+1].low && 
//           data[i].low < data[i+2].low) {
//         troughs.push({ index: i, value: data[i].low });
//       }
//     }
//     // Need at least 3 troughs for triple bottom
//     if (troughs.length < 3) return false;
//     // Check for triple bottom pattern (three similar troughs)
//     for (let i = 0; i < troughs.length - 2; i++) {
//       // Check if all three troughs are at similar heights (within 3%)
//       const trough1 = troughs[i].value;
//       const trough2 = troughs[i+1].value;
//       const trough3 = troughs[i+2].value;
//       const maxTrough = Math.max(trough1, trough2, trough3);
//       const minTrough = Math.min(trough1, trough2, trough3);
//       const avgTrough = (trough1 + trough2 + trough3) / 3;
//       const troughDiffPercent = ((maxTrough - minTrough) / avgTrough) * 100;
//       // If troughs are similar and properly spaced
//       if (troughDiffPercent < 5 && 
//           (troughs[i+1].index - troughs[i].index) > 3 && 
//           (troughs[i+2].index - troughs[i+1].index) > 3) {
//         return true;
//       }
//     }
//     return false;
//   }
//   // Ascending Triangle pattern detection
//   private static checkAscendingTriangle(data: any): boolean {
//     if (data.length < 15) return false;
//     // For ascending triangle, we need at least two similar highs and ascending lows
//     const highs = [];
//     for (let i = 2; i < data.length - 2; i++) {
//       if (data[i].high > data[i-1].high && 
//           data[i].high > data[i-2].high && 
//           data[i].high > data[i+1].high && 
//           data[i].high > data[i+2].high) {
//         highs.push({ index: i, value: data[i].high });
//       }
//     }
//     if (highs.length < 2) return false;
//     // Check for similar highs (resistance line)
//     for (let i = 0; i < highs.length - 1; i++) {
//       for (let j = i + 1; j < highs.length; j++) {
//         const highDiff = Math.abs(highs[i].value - highs[j].value);
//         const avgHigh = (highs[i].value + highs[j].value) / 2;
//         const highDiffPercent = (highDiff / avgHigh) * 100;
//         // If we have similar highs that are at least 5 bars apart
//         if (highDiffPercent < 3 && Math.abs(highs[j].index - highs[i].index) > 5) {
//           // Check for ascending lows between these highs
//           const lows = [];
//           for (let k = highs[i].index; k <= highs[j].index; k++) {
//             if (k > 1 && k < data.length - 2 &&
//                 data[k].low < data[k-1].low && 
//                 data[k].low < data[k+1].low) {
//               lows.push({ index: k, value: data[k].low });
//             }
//           }
//           // Need at least 2 lows to form an ascending trend
//           if (lows.length >= 2) {
//             // Check if lows are ascending
//             let ascending = true;
//             for (let k = 1; k < lows.length; k++) {
//               if (lows[k].value <= lows[k-1].value) {
//                 ascending = false;
//                 break;
//               }
//             }
//             if (ascending) {
//               return true;
//             }
//           }
//         }
//       }
//     }
//     return false;
//   }
//   // Descending Triangle pattern detection
//   private static checkDescendingTriangle(data: any): boolean {
//     if (data.length < 15) return false;
//     // For descending triangle, we need at least two similar lows and descending highs
//     const lows = [];
//     for (let i = 2; i < data.length - 2; i++) {
//       if (data[i].low < data[i-1].low && 
//           data[i].low < data[i-2].low && 
//           data[i].low < data[i+1].low && 
//           data[i].low < data[i+2].low) {
//         lows.push({ index: i, value: data[i].low });
//       }
//     }
//     if (lows.length < 2) return false;
//     // Check for similar lows (support line)
//     for (let i = 0; i < lows.length - 1; i++) {
//       for (let j = i + 1; j < lows.length; j++) {
//         const lowDiff = Math.abs(lows[i].value - lows[j].value);
//         const avgLow = (lows[i].value + lows[j].value) / 2;
//         const lowDiffPercent = (lowDiff / avgLow) * 100;
//         // If we have similar lows that are at least 5 bars apart
//         if (lowDiffPercent < 3 && Math.abs(lows[j].index - lows[i].index) > 5) {
//           // Check for descending highs between these lows
//           const highs = [];
//           for (let k = lows[i].index; k <= lows[j].index; k++) {
//             if (k > 1 && k < data.length - 2 &&
//                 data[k].high > data[k-1].high && 
//                 data[k].high > data[k+1].high) {
//               highs.push({ index: k, value: data[k].high });
//             }
//           }
//           // Need at least 2 highs to form a descending trend
//           if (highs.length >= 2) {
//             // Check if highs are descending
//             let descending = true;
//             for (let k = 1; k < highs.length; k++) {
//               if (highs[k].value >= highs[k-1].value) {
//                 descending = false;
//                 break;
//               }
//             }
//             if (descending) {
//               return true;
//             }
//           }
//         }
//       }
//     }
//     return false;
//   }
//   // Symmetrical Triangle pattern detection
//   private static checkSymmetricalTriangle(data: any): boolean {
//     if (data.length < 15) return false;
//     // For symmetrical triangle, we need descending highs and ascending lows
//     const highs = [];
//     for (let i = 2; i < data.length - 2; i++) {
//       if (data[i].high > data[i-1].high && 
//           data[i].high > data[i-2].high && 
//           data[i].high > data[i+1].high && 
//           data[i].high > data[i+2].high) {
//         highs.push({ index: i, value: data[i].high });
//       }
//     }
//     const lows = [];
//     for (let i = 2; i < data.length - 2; i++) {
//       if (data[i].low < data[i-1].low && 
//           data[i].low < data[i-2].low && 
//           data[i].low < data[i+1].low && 
//           data[i].low < data[i+2].low) {
//         lows.push({ index: i, value: data[i].low });
//       }
//     }
//     // Need at least 2 highs and 2 lows
//     if (highs.length < 2 || lows.length < 2) return false;
//     // Check for descending highs
//     let descendingHighs = true;
//     for (let i = 1; i < highs.length; i++) {
//       if (highs[i].value >= highs[i-1].value) {
//         descendingHighs = false;
//         break;
//       }
//     }
//     // Check for ascending lows
//     let ascendingLows = true;
//     for (let i = 1; i < lows.length; i++) {
//       if (lows[i].value <= lows[i-1].value) {
//         ascendingLows = false;
//         break;
//       }
//     }
//     // Both conditions must be true for a symmetrical triangle
//     return descendingHighs && ascendingLows;
//   }
//   // Bullish Flag pattern detection
//   private static checkBullFlag(data: any): boolean {
//     if (data.length < 15) return false;
//     // We need a strong uptrend (flag pole) followed by a short consolidation (flag)
//     // First, find a significant uptrend (pole)
//     let poleStart = -1;
//     let poleEnd = -1;
//     // Look for a strong upward move (at least 5% in a short period)
//     for (let i = 5; i < data.length - 5; i++) {
//       const startPrice = data[i-5].close;
//       const endPrice = data[i].close;
//       const percentChange = ((endPrice - startPrice) / startPrice) * 100;
//       if (percentChange > 5) {
//         poleStart = i-5;
//         poleEnd = i;
//         break;
//       }
//     }
//     if (poleStart === -1) return false;
//     // Look for a consolidation period after the pole (flag)
//     // Flag should be a slight downtrend or sideways movement
//     if (poleEnd + 5 >= data.length) return false;
//     const flagPeriod = Math.min(5, data.length - poleEnd - 1);
//     const flagStart = poleEnd;
//     const flagEnd = flagStart + flagPeriod;
//     // Calculate the slope of the flag
//     const flagStartPrice = data[flagStart].close;
//     const flagEndPrice = data[flagEnd].close;
//     const flagSlope = (flagEndPrice - flagStartPrice) / flagPeriod;
//     // Flag should be flat or slightly downward
//     if (flagSlope > 0.001 * flagStartPrice) return false;
//     // Calculate the volatility during the flag period
//     let sumSquaredDeviations = 0;
//     const meanPrice = data.slice(flagStart, flagEnd + 1).reduce((sum: any, d: { close: any }) => sum + d.close, 0) / (flagPeriod + 1);
//     for (let i = flagStart; i <= flagEnd; i++) {
//       sumSquaredDeviations += Math.pow(data[i].close - meanPrice, 2);
//     }
//     const volatility = Math.sqrt(sumSquaredDeviations / (flagPeriod + 1)) / meanPrice;
//     // Flag should have lower volatility than the pole
//     const poleVolatility = this.calculateVolatility(data, poleStart, poleEnd);
//     return volatility < poleVolatility;
//   }
//   // Bear Flag pattern detection
//   private static checkBearFlag(data: any): boolean {
//     if (data.length < 15) return false;
//     // We need a strong downtrend (flag pole) followed by a short consolidation (flag)
//     // First, find a significant downtrend (pole)
//     let poleStart = -1;
//     let poleEnd = -1;
//     // Look for a strong downward move (at least 5% in a short period)
//     for (let i = 5; i < data.length - 5; i++) {
//       const startPrice = data[i-5].close;
//       const endPrice = data[i].close;
//       const percentChange = ((endPrice - startPrice) / startPrice) * 100;
//       if (percentChange < -5) {
//         poleStart = i-5;
//         poleEnd = i;
//         break;
//       }
//     }
//     if (poleStart === -1) return false;
//     // Look for a consolidation period after the pole (flag)
//     // Flag should be a slight uptrend or sideways movement
//     if (poleEnd + 5 >= data.length) return false;
//     const flagPeriod = Math.min(5, data.length - poleEnd - 1);
//     const flagStart = poleEnd;
//     const flagEnd = flagStart + flagPeriod;
//     // Calculate the slope of the flag
//     const flagStartPrice = data[flagStart].close;
//     const flagEndPrice = data[flagEnd].close;
//     const flagSlope = (flagEndPrice - flagStartPrice) / flagPeriod;
//     // Flag should be flat or slightly upward
//     if (flagSlope < -0.001 * flagStartPrice) return false;
//     // Calculate the volatility during the flag period
//     let sumSquaredDeviations = 0;
//     const meanPrice = data.slice(flagStart, flagEnd + 1).reduce((sum: any, d: { close: any }) => sum + d.close, 0) / (flagPeriod + 1);
//     for (let i = flagStart; i <= flagEnd; i++) {
//       sumSquaredDeviations += Math.pow(data[i].close - meanPrice, 2);
//     }
//     const volatility = Math.sqrt(sumSquaredDeviations / (flagPeriod + 1));
//     // Flag should have lower volatility than the pole
//     const poleVolatility = this.calculateVolatility(data, poleStart, poleEnd);
//     return volatility < poleVolatility;
//   }
//   // Helper method to calculate volatility
//   private static calculateVolatility(data: any, start: number, end: number): number {
//     const period = end - start + 1;
//     const prices = data.slice(start, end + 1).map((d: any) => d.close);
//     const meanPrice = prices.reduce((sum: number, price: number) => sum + price, 0) / period;
//     let sumSquaredDeviations = 0;
//     for (const price of prices) {
//       sumSquaredDeviations += Math.pow(price - meanPrice, 2);
//     }
//     return Math.sqrt(sumSquaredDeviations / period) / meanPrice;
//   }
//   // Helper methods to find extremes between two points
//   private static findLowestBetween(data: any, start: number, end: number): number {
//     let lowestIndex = start;
//     for (let i = start + 1; i <= end; i++) {
//       if (data[i].low < data[lowestIndex].low) {
//         lowestIndex = i;
//       }
//     }
//     return lowestIndex;
//   }
//   private static findHighestBetween(data: any, start: number, end: number): number {
//     let highestIndex = start;
//     for (let i = start + 1; i <= end; i++) {
//       if (data[i].high > data[highestIndex].high) {
//         highestIndex = i;
//       }
//     }
//     return highestIndex;
//   }
//   // Check for bullish engulfing pattern
//   private static checkBullishEngulfing(data: any): boolean {
//     if (data.length < 5) return false
//     // Look for bullish engulfing in the last 10 candles
//     const startIdx = Math.max(0, data.length - 10)
//     for (let i = startIdx + 1; i < data.length; i++) {
//       const prevCandle = data[i - 1]
//       const currCandle = data[i]
//       // Previous candle is bearish (close < open)
//       const prevBearish = prevCandle.close < prevCandle.open
//       // Current candle is bullish (close > open)
//       const currBullish = currCandle.close > currCandle.open
//       // Current candle engulfs previous candle
//       const engulfs = currCandle.open < prevCandle.close && currCandle.close > prevCandle.open
//       if (prevBearish && currBullish && engulfs) {
//         return true
//       }
//     }
//     return false
//   }
//   // Check for cup and handle pattern
//   private static checkCupAndHandle(data: any): boolean {
//     if (data.length < 20) return false
//     // Simplified cup and handle detection
//     // Look for a U-shaped pattern followed by a small downward drift
//     // First find a high point
//     let highPoint = -1
//     for (let i = 5; i < data.length - 15; i++) {
//       if (
//         data[i].high > data[i - 1].high &&
//         data[i].high > data[i - 2].high &&
//         data[i].high > data[i + 1].high &&
//         data[i].high > data[i + 2].high
//       ) {
//         highPoint = i
//         break
//       }
//     }
//     if (highPoint === -1) return false
//     // Look for a low point after the high point
//     let lowPoint = -1
//     for (let i = highPoint + 3; i < data.length - 10; i++) {
//       if (
//         data[i].low < data[i - 1].low &&
//         data[i].low < data[i - 2].low &&
//         data[i].low < data[i + 1].low &&
//         data[i].low < data[i + 2].low
//       ) {
//         lowPoint = i
//         break
//       }
//     }
//     if (lowPoint === -1) return false
//     // Look for a second high point similar to the first
//     let secondHighPoint = -1
//     for (let i = lowPoint + 3; i < data.length - 5; i++) {
//       if (
//         data[i].high > data[i - 1].high &&
//         data[i].high > data[i - 2].high &&
//         data[i].high > data[i + 1].high &&
//         data[i].high > data[i + 2].high
//       ) {
//         // Check if this high is similar to the first high
//         const priceDiff = Math.abs(data[i].high - data[highPoint].high)
//         const avgPrice = (data[i].high + data[highPoint].high) / 2
//         const percentDiff = (priceDiff / avgPrice) * 100
//         if (percentDiff < 3) {
//           secondHighPoint = i
//           break
//         }
//       }
//     }
//     if (secondHighPoint === -1) return false
//     // Look for a small pullback (handle) after the second high
//     let handleFound = false
//     for (let i = secondHighPoint + 1; i < data.length - 2; i++) {
//       if (data[i].low < data[secondHighPoint].low && data[i].low > data[lowPoint].low) {
//         handleFound = true
//         break
//       }
//     }
//     return handleFound
//   }
//   // Indicator 2: Check for Elliot Wave patterns
//   private static checkElliotWave(data: any): boolean {
//     if (data.length < 15) return false
//     // Simplified Elliott Wave detection
//     // Looking for a 5-wave impulse pattern (3 up, 2 down)
//     // Find significant price movements
//     const significantMoves = []
//     let currentDirection = null
//     let startIndex = 0
//     for (let i = 1; i < data.length; i++) {
//       const priceChange = data[i].close - data[i - 1].close
//       const direction = priceChange > 0 ? "up" : "down"
//       // If direction changes or this is the first significant move
//       if (direction !== currentDirection) {
//         if (currentDirection !== null) {
//           significantMoves.push({
//             direction: currentDirection,
//             startIndex: startIndex,
//             endIndex: i - 1,
//             startPrice: data[startIndex].close,
//             endPrice: data[i - 1].close,
//           })
//         }
//         currentDirection = direction
//         startIndex = i - 1
//       }
//     }
//     // Add the last move
//     if (currentDirection !== null) {
//       significantMoves.push({
//         direction: currentDirection,
//         startIndex: startIndex,
//         endIndex: data.length - 1,
//         startPrice: data[startIndex].close,
//         endPrice: data[data.length - 1].close,
//       })
//     }
//     // Need at least 5 moves for an Elliott Wave pattern
//     if (significantMoves.length < 5) return false
//     // Check the last 5 moves for an Elliott Wave pattern
//     const lastFiveMoves = significantMoves.slice(-5)
//     // Pattern should be: up, down, up, down, up
//     const expectedPattern = ["up", "down", "up", "down", "up"]
//     // Check if the pattern matches
//     for (let i = 0; i < 5; i++) {
//       if (lastFiveMoves[i].direction !== expectedPattern[i]) {
//         return false
//       }
//     }
//     // Check wave relationships (simplified)
//     // Wave 3 should be the longest up wave
//     const wave1 = Math.abs(lastFiveMoves[0].endPrice - lastFiveMoves[0].startPrice)
//     const wave3 = Math.abs(lastFiveMoves[2].endPrice - lastFiveMoves[2].startPrice)
//     const wave5 = Math.abs(lastFiveMoves[4].endPrice - lastFiveMoves[4].startPrice)
//     if (wave3 <= wave1 || wave3 <= wave5) {
//       return false
//     }
//     return true
//   }
//   // Indicator 3: Check for MACD Divergence
//   private static checkMACDDivergence(data: any): boolean {
//     if (data.length < 26) return false
//     // Calculate MACD
//     const macdData = this.calculateMACD(data)
//     const macdLine = macdData.macdLine
//     const signalLine = macdData.signalLine
//     // Look for bullish divergence
//     // Price making lower lows but MACD making higher lows
//     // Find price lows in the last 15 bars
//     const priceLows = []
//     for (let i = 5; i < data.length - 5; i++) {
//       if (
//         data[i].low < data[i - 1].low &&
//         data[i].low < data[i - 2].low &&
//         data[i].low < data[i + 1].low &&
//         data[i].low < data[i + 2].low
//       ) {
//         priceLows.push({ index: i, value: data[i].low })
//       }
//     }
//     // Need at least 2 lows to check for divergence
//     if (priceLows.length < 2) return false
//     // Get the last two price lows
//     const lastTwoPriceLows = priceLows.slice(-2)
//     // Check if price is making lower lows
//     const priceIsLower = lastTwoPriceLows[1].value < lastTwoPriceLows[0].value
//     // Get MACD values at the same points
//     const macdAtFirstLow = macdLine[lastTwoPriceLows[0].index]
//     const macdAtSecondLow = macdLine[lastTwoPriceLows[1].index]
//     // Check if MACD is making higher lows (bullish divergence)
//     const macdIsHigher = macdAtSecondLow > macdAtFirstLow
//     // Bullish divergence: price making lower lows but MACD making higher lows
//     return priceIsLower && macdIsHigher
//   }
//   // Indicator 4: Check Cycles Analysis
//   private static checkCyclesAnalysis(data: any): boolean {
//     if (data.length < 20) return false
//     // Simplified cycle analysis
//     // Looking for regular oscillations in price
//     // Calculate rate of change (ROC) for 5-day periods
//     const roc = []
//     for (let i = 5; i < data.length; i++) {
//       const percentChange = ((data[i].close - data[i - 5].close) / data[i - 5].close) * 100
//       roc.push(percentChange)
//     }
//     // Count zero crossings (changes from positive to negative or vice versa)
//     let zeroCrossings = 0
//     for (let i = 1; i < roc.length; i++) {
//       if ((roc[i] > 0 && roc[i - 1] < 0) || (roc[i] < 0 && roc[i - 1] > 0)) {
//         zeroCrossings++
//       }
//     }
//     // Calculate average period length
//     const avgPeriodLength = roc.length / (zeroCrossings / 2)
//     // Check if we're in an upward phase of the cycle
//     const lastFewROC = roc.slice(-3)
//     const isUpwardPhase = lastFewROC.reduce((sum, val) => sum + val, 0) > 0
//     // Regular cycles should have at least 3 zero crossings
//     // and the average period should be somewhat consistent
//     return zeroCrossings >= 3 && avgPeriodLength > 0 && avgPeriodLength < 10 && isUpwardPhase
//   }
//   // Helper: Calculate MACD (12-day EMA - 26-day EMA) and Signal Line (9-day EMA of MACD)
//   private static calculateMACD(data: any): { macdLine: number[]; signalLine: number[] } {
//     const closePrices = data.map((d: { close: any }) => d.close)
//     // Calculate EMAs
//     const ema12 = this.calculateEMA(closePrices, 12)
//     const ema26 = this.calculateEMA(closePrices, 26)
//     // Calculate MACD Line
//     const macdLine = []
//     for (let i = 0; i < ema12.length; i++) {
//       if (i < 26 - 12) {
//         macdLine.push(0) // Padding for the first (26-12) days
//       } else {
//         macdLine.push(ema12[i] - ema26[i - (26 - 12)])
//       }
//     }
//     // Calculate Signal Line (9-day EMA of MACD)
//     const signalLine = this.calculateEMA(macdLine.slice(26 - 12), 9)
//     // Pad signal line to match macdLine length
//     const paddedSignalLine = Array(26 - 12 + 9 - 1)
//       .fill(0)
//       .concat(signalLine)
//     return {
//       macdLine: macdLine,
//       signalLine: paddedSignalLine,
//     }
//   }
//   // Helper: Calculate Exponential Moving Average (EMA)
//   private static calculateEMA(prices: number[], period: number): number[] {
//     const k = 2 / (period + 1)
//     const ema = [prices[0]] // Start with SMA for first value
//     // Calculate SMA for first period
//     if (prices.length >= period) {
//       let sum = 0
//       for (let i = 0; i < period; i++) {
//         sum += prices[i]
//       }
//       ema[0] = sum / period
//     }
//     // Calculate EMA for remaining prices
//     for (let i = 1; i < prices.length; i++) {
//       ema.push(prices[i] * k + ema[i - 1] * (1 - k))
//     }
//     return ema
//   }
// }
// // import { NIGERIAN_STOCKS, US_STOCKS } from '../utils/stockList';
// // import { AnalysisService } from './analysis.service';
// // import { StockData, AnalyzedStock } from '../types/indicators';
// // export class StockService {
// //   static async fetchStockData(
// //     symbol: string,
// //     timeframe: string = 'daily'
// //   ): Promise<StockData[]> {
// //     // Mock data generator - replace with real API call
// //     const basePrice = ((symbol.charCodeAt(0) + symbol.charCodeAt(symbol.length - 1)) % 100) + 50;
// //     const volatility = (symbol.length % 5) + 1;
// //     const days = timeframe === 'weekly' ? 52 : 30;
// //     const data: StockData[] = [];
// //     let currentPrice = basePrice;
// //     for (let i = 0; i < days; i++) {
// //       const change = (Math.random() - 0.45) * volatility;
// //       currentPrice += change;
// //       data.push({
// //         date: new Date(Date.now() - (days - i) * 86400000),
// //         open: currentPrice - change,
// //         close: currentPrice,
// //         high: currentPrice + Math.random() * volatility,
// //         low: currentPrice - Math.random() * volatility,
// //         volume: Math.floor(1000 + Math.random() * 5000)
// //       });
// //     }
// //     return data;
// //   }
// //   static async analyzeAllStocks(
// //     timeframe: string = 'daily'
// //   ): Promise<AnalyzedStock[]> {
// //     const allStocks = [...NIGERIAN_STOCKS, ...US_STOCKS];
// //     const results: AnalyzedStock[] = [];
// //     for (const symbol of allStocks) {
// //       const data = await this.fetchStockData(symbol, timeframe);
// //       results.push(await AnalysisService.analyzeStock(symbol, data, timeframe));
// //     }
// //     return results.sort((a, b) => 
// //       b.finalRecommendation.confidence - a.finalRecommendation.confidence
// //     );
// //   }
// // }
const stockList_1 = require("../utils/stockList");
class StockService {
    // Fetch stock data with timeframe support
    static async fetchStockData(symbol, timeframe = 'daily') {
        // Generate more varied stock data based on the symbol to ensure different results
        const basePrice = ((symbol.charCodeAt(0) + symbol.charCodeAt(symbol.length - 1)) % 100) + 100;
        const volatility = (symbol.length % 5) + 1;
        const stockData = [];
        let currentPrice = basePrice;
        // Determine the number of data points and time interval based on timeframe
        const dataPoints = timeframe === 'weekly' ? 52 : 30; // 52 weeks or 30 days
        const timeInterval = timeframe === 'weekly' ? 7 * 86400000 : 86400000; // 7 days or 1 day in milliseconds
        for (let i = 0; i < dataPoints; i++) {
            // Create more realistic price movements
            const change = (Math.random() - 0.48) * volatility; // Slight upward bias
            currentPrice += change;
            const high = currentPrice + Math.random() * volatility;
            const low = currentPrice - Math.random() * volatility;
            const volume = Math.floor(1000 + Math.random() * 5000);
            stockData.push({
                date: new Date(Date.now() - (dataPoints - i) * timeInterval),
                open: currentPrice - change,
                close: currentPrice,
                high: high,
                low: low,
                volume: volume,
            });
        }
        return stockData;
    }
    // Analyze all stocks and categorize them based on indicators
    static async analyzeAllStocks(timeframe = 'daily') {
        const allStocks = [...stockList_1.NIGERIAN_STOCKS, ...stockList_1.US_STOCKS, ...stockList_1.CRYPTO_STOCKS];
        const results = [];
        for (const symbol of allStocks) {
            const stockData = await this.fetchStockData(symbol, timeframe);
            // Calculate technical indicators (true = buy, false = sell)
            const indicators = [
                { name: "Auto Chart Patterns", result: this.checkAutoChartPatterns(stockData) },
                { name: "Elliot Wave", result: this.checkElliotWave(stockData) },
                { name: "MACD Divergence", result: this.checkMACDDivergence(stockData) },
                { name: "Cycles Analysis", result: this.checkCyclesAnalysis(stockData) },
                { name: "All Chart Patterns", result: this.checkAllChartPatterns(stockData) },
            ];
            // Count the number of buy signals
            const buySignals = indicators.filter((ind) => ind.result).length;
            const totalIndicators = indicators.length;
            const sellSignals = totalIndicators - buySignals;
            // Determine the category and recommendation based on buy signals
            let category, recommendation;
            if (buySignals === totalIndicators) {
                category = "Very Strong";
                recommendation = "Strong Buy";
            }
            else if (buySignals === totalIndicators - 1) {
                category = "Strong";
                recommendation = "Buy";
            }
            else if (buySignals === totalIndicators - 2) {
                category = "Solid";
                recommendation = "Hold";
            }
            else if (buySignals === 1) {
                category = "Weak";
                recommendation = "Sell";
            }
            else {
                category = "Very Weak";
                recommendation = "Strong Sell";
            }
            // Add the stock's result to the results array
            results.push({
                symbol,
                indicators: indicators.map((ind) => ({
                    name: ind.name,
                    result: ind.result,
                    signal: ind.result ? "buy" : "sell"
                })),
                category,
                recommendation,
                buySignals,
                sellSignals,
                timeframe,
            });
        }
        return results;
    }
    // Indicator 1: Check for Auto Chart Patterns (looking for bullish patterns)
    static checkAutoChartPatterns(data) {
        // Check for bullish patterns
        const bullishPatterns = [
            this.checkDoubleBottom(data),
            this.checkBullishEngulfing(data),
            this.checkCupAndHandle(data),
            this.checkInverseHeadAndShoulders(data),
            this.checkAscendingTriangle(data),
            this.checkBullFlag(data)
        ];
        // Check for bearish patterns
        const bearishPatterns = [
            this.checkDoubleTop(data),
            this.checkHeadAndShoulders(data),
            this.checkTripleTop(data),
            this.checkDescendingTriangle(data),
            this.checkBearFlag(data),
            this.checkBearishEngulfing(data)
        ];
        // Count bullish and bearish patterns
        const bullishCount = bullishPatterns.filter(Boolean).length;
        const bearishCount = bearishPatterns.filter(Boolean).length;
        // Return true if more bullish than bearish patterns, false otherwise
        return bullishCount > bearishCount;
    }
    // Indicator 2: Check for Elliot Wave patterns
    static checkElliotWave(data) {
        if (data.length < 15)
            return false;
        // Find significant price movements
        const significantMoves = [];
        let currentDirection = null;
        let startIndex = 0;
        for (let i = 1; i < data.length; i++) {
            const priceChange = data[i].close - data[i - 1].close;
            const direction = priceChange > 0 ? "up" : "down";
            // If direction changes or this is the first significant move
            if (direction !== currentDirection) {
                if (currentDirection !== null) {
                    significantMoves.push({
                        direction: currentDirection,
                        startIndex: startIndex,
                        endIndex: i - 1,
                        startPrice: data[startIndex].close,
                        endPrice: data[i - 1].close,
                    });
                }
                currentDirection = direction;
                startIndex = i - 1;
            }
        }
        // Add the last move
        if (currentDirection !== null) {
            significantMoves.push({
                direction: currentDirection,
                startIndex: startIndex,
                endIndex: data.length - 1,
                startPrice: data[startIndex].close,
                endPrice: data[data.length - 1].close,
            });
        }
        // Need at least 5 moves for an Elliott Wave pattern
        if (significantMoves.length < 5)
            return false;
        // Check the last 5 moves for bullish Elliott Wave pattern (up, down, up, down, up)
        const lastFiveMoves = significantMoves.slice(-5);
        const bullishPattern = ["up", "down", "up", "down", "up"];
        // Check if the pattern matches bullish completion
        let bullishMatch = true;
        for (let i = 0; i < 5; i++) {
            if (lastFiveMoves[i].direction !== bullishPattern[i]) {
                bullishMatch = false;
                break;
            }
        }
        // Check for bearish Elliott Wave pattern (down, up, down, up, down)
        const bearishPattern = ["down", "up", "down", "up", "down"];
        // Check if the pattern matches bearish completion
        let bearishMatch = true;
        for (let i = 0; i < 5; i++) {
            if (lastFiveMoves[i].direction !== bearishPattern[i]) {
                bearishMatch = false;
                break;
            }
        }
        // If bullish pattern is complete, check wave relationships
        if (bullishMatch) {
            const wave1 = Math.abs(lastFiveMoves[0].endPrice - lastFiveMoves[0].startPrice);
            const wave3 = Math.abs(lastFiveMoves[2].endPrice - lastFiveMoves[2].startPrice);
            const wave5 = Math.abs(lastFiveMoves[4].endPrice - lastFiveMoves[4].startPrice);
            // Wave 3 should be the longest in a proper Elliott Wave
            if (wave3 > wave1 && wave3 > wave5) {
                return true; // Strong buy signal
            }
        }
        // If bearish pattern is complete, it's a sell signal
        if (bearishMatch) {
            return false; // Sell signal
        }
        // Check if we're in the middle of a bullish pattern
        if (lastFiveMoves.length >= 3 &&
            lastFiveMoves[lastFiveMoves.length - 3].direction === "up" &&
            lastFiveMoves[lastFiveMoves.length - 2].direction === "down" &&
            lastFiveMoves[lastFiveMoves.length - 1].direction === "up") {
            return true; // Potential buy signal
        }
        return false; // Default to no buy signal
    }
    // Indicator 3: Check for MACD Divergence
    static checkMACDDivergence(data) {
        if (data.length < 26)
            return false;
        // Calculate MACD
        const macdData = this.calculateMACD(data);
        const macdLine = macdData.macdLine;
        const signalLine = macdData.signalLine;
        // Check for bullish divergence (price making lower lows but MACD making higher lows)
        const priceLows = [];
        for (let i = 5; i < data.length - 5; i++) {
            if (data[i].low < data[i - 1].low &&
                data[i].low < data[i - 2].low &&
                data[i].low < data[i + 1].low &&
                data[i].low < data[i + 2].low) {
                priceLows.push({ index: i, value: data[i].low });
            }
        }
        // Check for bearish divergence (price making higher highs but MACD making lower highs)
        const priceHighs = [];
        for (let i = 5; i < data.length - 5; i++) {
            if (data[i].high > data[i - 1].high &&
                data[i].high > data[i - 2].high &&
                data[i].high > data[i + 1].high &&
                data[i].high > data[i + 2].high) {
                priceHighs.push({ index: i, value: data[i].high });
            }
        }
        // Check for bullish divergence
        if (priceLows.length >= 2) {
            const lastTwoPriceLows = priceLows.slice(-2);
            const priceIsLower = lastTwoPriceLows[1].value < lastTwoPriceLows[0].value;
            const macdAtFirstLow = macdLine[lastTwoPriceLows[0].index];
            const macdAtSecondLow = macdLine[lastTwoPriceLows[1].index];
            const macdIsHigher = macdAtSecondLow > macdAtFirstLow;
            if (priceIsLower && macdIsHigher) {
                return true; // Bullish divergence - buy signal
            }
        }
        // Check for bearish divergence
        if (priceHighs.length >= 2) {
            const lastTwoPriceHighs = priceHighs.slice(-2);
            const priceIsHigher = lastTwoPriceHighs[1].value > lastTwoPriceHighs[0].value;
            const macdAtFirstHigh = macdLine[lastTwoPriceHighs[0].index];
            const macdAtSecondHigh = macdLine[lastTwoPriceHighs[1].index];
            const macdIsLower = macdAtSecondHigh < macdAtFirstHigh;
            if (priceIsHigher && macdIsLower) {
                return false; // Bearish divergence - sell signal
            }
        }
        // Check MACD crossovers
        for (let i = 1; i < macdLine.length; i++) {
            // Bullish crossover (MACD crosses above signal line)
            if (macdLine[i - 1] < signalLine[i - 1] && macdLine[i] > signalLine[i]) {
                return true;
            }
            // Bearish crossover (MACD crosses below signal line)
            if (macdLine[i - 1] > signalLine[i - 1] && macdLine[i] < signalLine[i]) {
                return false;
            }
        }
        // If no clear signal, check if MACD is positive (bullish) or negative (bearish)
        return macdLine[macdLine.length - 1] > 0;
    }
    // Indicator 4: Check Cycles Analysis
    static checkCyclesAnalysis(data) {
        if (data.length < 20)
            return false;
        // Calculate rate of change (ROC) for 5-day periods
        const roc = [];
        for (let i = 5; i < data.length; i++) {
            const percentChange = ((data[i].close - data[i - 5].close) / data[i - 5].close) * 100;
            roc.push(percentChange);
        }
        // Count zero crossings (changes from positive to negative or vice versa)
        let zeroCrossings = 0;
        for (let i = 1; i < roc.length; i++) {
            if ((roc[i] > 0 && roc[i - 1] < 0) || (roc[i] < 0 && roc[i - 1] > 0)) {
                zeroCrossings++;
            }
        }
        // Calculate average period length
        const avgPeriodLength = roc.length / (zeroCrossings / 2 || 1);
        // Check if we're in an upward or downward phase of the cycle
        const lastFewROC = roc.slice(-3);
        const isUpwardPhase = lastFewROC.reduce((sum, val) => sum + val, 0) > 0;
        // Check if we're near the beginning or end of a cycle
        const recentCrossings = [];
        for (let i = roc.length - 10; i < roc.length; i++) {
            if (i > 0 && ((roc[i] > 0 && roc[i - 1] < 0) || (roc[i] < 0 && roc[i - 1] > 0))) {
                recentCrossings.push(i);
            }
        }
        const distanceFromLastCrossing = recentCrossings.length > 0 ?
            roc.length - recentCrossings[recentCrossings.length - 1] : 0;
        // Regular cycles should have at least 3 zero crossings
        // and the average period should be somewhat consistent
        if (zeroCrossings >= 3 && avgPeriodLength > 0 && avgPeriodLength < 10) {
            if (isUpwardPhase) {
                // If we're early in an upward phase, it's a stronger buy signal
                if (distanceFromLastCrossing < avgPeriodLength / 3) {
                    return true; // Strong buy signal
                }
                else if (distanceFromLastCrossing > avgPeriodLength * 2 / 3) {
                    return false; // Late in upward cycle, approaching reversal
                }
                else {
                    return true; // Still in upward phase
                }
            }
            else {
                // If we're late in a downward phase, it might be time to buy
                if (distanceFromLastCrossing > avgPeriodLength * 2 / 3) {
                    return true; // Late in downward cycle, approaching upward reversal
                }
                else {
                    return false; // Still in downward phase
                }
            }
        }
        // Default to the current phase direction
        return isUpwardPhase;
    }
    // Indicator 5: Check All Chart Patterns
    static checkAllChartPatterns(data) {
        if (data.length < 15)
            return false;
        // Check for bullish patterns
        const bullishPatterns = [
            this.checkInverseHeadAndShoulders(data),
            this.checkDoubleBottom(data),
            this.checkTripleBottom(data),
            this.checkAscendingTriangle(data),
            this.checkBullFlag(data),
            this.checkBullishEngulfing(data),
            this.checkCupAndHandle(data)
        ];
        // Check for bearish patterns
        const bearishPatterns = [
            this.checkHeadAndShoulders(data),
            this.checkDoubleTop(data),
            this.checkTripleTop(data),
            this.checkDescendingTriangle(data),
            this.checkBearFlag(data),
            this.checkBearishEngulfing(data)
        ];
        // Count bullish and bearish patterns
        const bullishCount = bullishPatterns.filter(Boolean).length;
        const bearishCount = bearishPatterns.filter(Boolean).length;
        // Return true if more bullish than bearish patterns, false otherwise
        return bullishCount > bearishCount;
    }
    // Head and Shoulders pattern detection (bearish pattern)
    static checkHeadAndShoulders(data) {
        if (data.length < 20)
            return false;
        // Find peaks (potential shoulders and head)
        const peaks = [];
        for (let i = 2; i < data.length - 2; i++) {
            if (data[i].high > data[i - 1].high &&
                data[i].high > data[i - 2].high &&
                data[i].high > data[i + 1].high &&
                data[i].high > data[i + 2].high) {
                peaks.push({ index: i, value: data[i].high });
            }
        }
        // Need at least 3 peaks for head and shoulders
        if (peaks.length < 3)
            return false;
        // Analyze consecutive groups of 3 peaks
        for (let i = 0; i < peaks.length - 2; i++) {
            const leftShoulder = peaks[i];
            const head = peaks[i + 1];
            const rightShoulder = peaks[i + 2];
            // Check if the middle peak (head) is higher than the two shoulders
            if (head.value > leftShoulder.value && head.value > rightShoulder.value) {
                // Check if the shoulders are at similar heights (within 10%)
                const shoulderDiff = Math.abs(leftShoulder.value - rightShoulder.value);
                const avgShoulderHeight = (leftShoulder.value + rightShoulder.value) / 2;
                const shoulderHeightDiffPercent = (shoulderDiff / avgShoulderHeight) * 100;
                if (shoulderHeightDiffPercent < 10) {
                    // Check for a neckline (support level connecting the lows between peaks)
                    const leftTrough = this.findLowestBetween(data, leftShoulder.index, head.index);
                    const rightTrough = this.findLowestBetween(data, head.index, rightShoulder.index);
                    // If troughs are at similar levels, we have a potential neckline
                    const troughDiff = Math.abs(data[leftTrough].low - data[rightTrough].low);
                    const avgTroughHeight = (data[leftTrough].low + data[rightTrough].low) / 2;
                    const troughHeightDiffPercent = (troughDiff / avgTroughHeight) * 100;
                    if (troughHeightDiffPercent < 5) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    // Inverse Head and Shoulders pattern detection (bullish pattern)
    static checkInverseHeadAndShoulders(data) {
        if (data.length < 20)
            return false;
        // Find troughs (potential shoulders and head)
        const troughs = [];
        for (let i = 2; i < data.length - 2; i++) {
            if (data[i].low < data[i - 1].low &&
                data[i].low < data[i - 2].low &&
                data[i].low < data[i + 1].low &&
                data[i].low < data[i + 2].low) {
                troughs.push({ index: i, value: data[i].low });
            }
        }
        // Need at least 3 troughs for inverse head and shoulders
        if (troughs.length < 3)
            return false;
        // Analyze consecutive groups of 3 troughs
        for (let i = 0; i < troughs.length - 2; i++) {
            const leftShoulder = troughs[i];
            const head = troughs[i + 1];
            const rightShoulder = troughs[i + 2];
            // Check if the middle trough (head) is lower than the two shoulders
            if (head.value < leftShoulder.value && head.value < rightShoulder.value) {
                // Check if the shoulders are at similar heights (within 10%)
                const shoulderDiff = Math.abs(leftShoulder.value - rightShoulder.value);
                const avgShoulderHeight = (leftShoulder.value + rightShoulder.value) / 2;
                const shoulderHeightDiffPercent = (shoulderDiff / avgShoulderHeight) * 100;
                if (shoulderHeightDiffPercent < 10) {
                    // Check for a neckline (resistance level connecting the highs between troughs)
                    const leftPeak = this.findHighestBetween(data, leftShoulder.index, head.index);
                    const rightPeak = this.findHighestBetween(data, head.index, rightShoulder.index);
                    // If peaks are at similar levels, we have a potential neckline
                    const peakDiff = Math.abs(data[leftPeak].high - data[rightPeak].high);
                    const avgPeakHeight = (data[leftPeak].high + data[rightPeak].high) / 2;
                    const peakHeightDiffPercent = (peakDiff / avgPeakHeight) * 100;
                    if (peakHeightDiffPercent < 5) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    // Double Top pattern detection (bearish pattern)
    static checkDoubleTop(data) {
        if (data.length < 15)
            return false;
        // Find peaks
        const peaks = [];
        for (let i = 2; i < data.length - 2; i++) {
            if (data[i].high > data[i - 1].high &&
                data[i].high > data[i - 2].high &&
                data[i].high > data[i + 1].high &&
                data[i].high > data[i + 2].high) {
                peaks.push({ index: i, value: data[i].high });
            }
        }
        // Need at least 2 peaks for double top
        if (peaks.length < 2)
            return false;
        // Check for double top pattern (two similar peaks with a significant trough between)
        for (let i = 0; i < peaks.length - 1; i++) {
            for (let j = i + 1; j < peaks.length; j++) {
                // Check if peaks are at similar heights (within 3%)
                const peakDiff = Math.abs(peaks[i].value - peaks[j].value);
                const avgPeakHeight = (peaks[i].value + peaks[j].value) / 2;
                const peakHeightDiffPercent = (peakDiff / avgPeakHeight) * 100;
                // If peaks are similar in height and at least 5 bars apart
                if (peakHeightDiffPercent < 3 && Math.abs(peaks[j].index - peaks[i].index) > 5) {
                    // Check for a significant trough between the peaks
                    const troughIndex = this.findLowestBetween(data, peaks[i].index, peaks[j].index);
                    const trough = data[troughIndex].low;
                    // Calculate the depth of the trough relative to the peaks
                    const troughDepth = avgPeakHeight - trough;
                    const troughDepthPercent = (troughDepth / avgPeakHeight) * 100;
                    // If trough is deep enough, we have a double top
                    if (troughDepthPercent > 3) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    // Double Bottom pattern (bullish pattern)
    static checkDoubleBottom(data) {
        if (data.length < 15)
            return false;
        // Find troughs
        const troughs = [];
        for (let i = 2; i < data.length - 2; i++) {
            if (data[i].low < data[i - 1].low &&
                data[i].low < data[i - 2].low &&
                data[i].low < data[i + 1].low &&
                data[i].low < data[i + 2].low) {
                troughs.push({ index: i, value: data[i].low });
            }
        }
        // Need at least 2 troughs for double bottom
        if (troughs.length < 2)
            return false;
        // Check for double bottom pattern (two similar troughs with a significant peak between)
        for (let i = 0; i < troughs.length - 1; i++) {
            for (let j = i + 1; j < troughs.length; j++) {
                // Check if troughs are at similar heights (within 3%)
                const troughDiff = Math.abs(troughs[i].value - troughs[j].value);
                const avgTroughHeight = (troughs[i].value + troughs[j].value) / 2;
                const troughHeightDiffPercent = (troughDiff / avgTroughHeight) * 100;
                // If troughs are similar in height and at least 5 bars apart
                if (troughHeightDiffPercent < 3 && Math.abs(troughs[j].index - troughs[i].index) > 5) {
                    // Check for a significant peak between the troughs
                    const peakIndex = this.findHighestBetween(data, troughs[i].index, troughs[j].index);
                    const peak = data[peakIndex].high;
                    // Calculate the height of the peak relative to the troughs
                    const peakHeight = peak - avgTroughHeight;
                    const peakHeightPercent = (peakHeight / avgTroughHeight) * 100;
                    // If peak is high enough, we have a double bottom
                    if (peakHeightPercent > 3) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    // Triple Top pattern detection (bearish pattern)
    static checkTripleTop(data) {
        if (data.length < 20)
            return false;
        // Find peaks
        const peaks = [];
        for (let i = 2; i < data.length - 2; i++) {
            if (data[i].high > data[i - 1].high &&
                data[i].high > data[i - 2].high &&
                data[i].high > data[i + 1].high &&
                data[i].high > data[i + 2].high) {
                peaks.push({ index: i, value: data[i].high });
            }
        }
        // Need at least 3 peaks for triple top
        if (peaks.length < 3)
            return false;
        // Check for triple top pattern (three similar peaks)
        for (let i = 0; i < peaks.length - 2; i++) {
            // Check if all three peaks are at similar heights (within 5%)
            const peak1 = peaks[i].value;
            const peak2 = peaks[i + 1].value;
            const peak3 = peaks[i + 2].value;
            const maxPeak = Math.max(peak1, peak2, peak3);
            const minPeak = Math.min(peak1, peak2, peak3);
            const avgPeak = (peak1 + peak2 + peak3) / 3;
            const peakDiffPercent = ((maxPeak - minPeak) / avgPeak) * 100;
            // If peaks are similar and properly spaced
            if (peakDiffPercent < 5 &&
                (peaks[i + 1].index - peaks[i].index) > 3 &&
                (peaks[i + 2].index - peaks[i + 1].index) > 3) {
                return true;
            }
        }
        return false;
    }
    // Triple Bottom pattern detection (bullish pattern)
    static checkTripleBottom(data) {
        if (data.length < 20)
            return false;
        // Find troughs
        const troughs = [];
        for (let i = 2; i < data.length - 2; i++) {
            if (data[i].low < data[i - 1].low &&
                data[i].low < data[i - 2].low &&
                data[i].low < data[i + 1].low &&
                data[i].low < data[i + 2].low) {
                troughs.push({ index: i, value: data[i].low });
            }
        }
        // Need at least 3 troughs for triple bottom
        if (troughs.length < 3)
            return false;
        // Check for triple bottom pattern (three similar troughs)
        for (let i = 0; i < troughs.length - 2; i++) {
            // Check if all three troughs are at similar heights (within 5%)
            const trough1 = troughs[i].value;
            const trough2 = troughs[i + 1].value;
            const trough3 = troughs[i + 2].value;
            const maxTrough = Math.max(trough1, trough2, trough3);
            const minTrough = Math.min(trough1, trough2, trough3);
            const avgTrough = (trough1 + trough2 + trough3) / 3;
            const troughDiffPercent = ((maxTrough - minTrough) / avgTrough) * 100;
            // If troughs are similar and properly spaced
            if (troughDiffPercent < 5 &&
                (troughs[i + 1].index - troughs[i].index) > 3 &&
                (troughs[i + 2].index - troughs[i + 1].index) > 3) {
                return true;
            }
        }
        return false;
    }
    // Ascending Triangle pattern detection (bullish pattern)
    static checkAscendingTriangle(data) {
        if (data.length < 15)
            return false;
        // For ascending triangle, we need at least two similar highs and ascending lows
        const highs = [];
        for (let i = 2; i < data.length - 2; i++) {
            if (data[i].high > data[i - 1].high &&
                data[i].high > data[i - 2].high &&
                data[i].high > data[i + 1].high &&
                data[i].high > data[i + 2].high) {
                highs.push({ index: i, value: data[i].high });
            }
        }
        if (highs.length < 2)
            return false;
        // Check for similar highs (resistance line)
        for (let i = 0; i < highs.length - 1; i++) {
            for (let j = i + 1; j < highs.length; j++) {
                const highDiff = Math.abs(highs[i].value - highs[j].value);
                const avgHigh = (highs[i].value + highs[j].value) / 2;
                const highDiffPercent = (highDiff / avgHigh) * 100;
                // If we have similar highs that are at least 5 bars apart
                if (highDiffPercent < 3 && Math.abs(highs[j].index - highs[i].index) > 5) {
                    // Check for ascending lows between these highs
                    const lows = [];
                    for (let k = highs[i].index; k <= highs[j].index; k++) {
                        if (k > 1 && k < data.length - 2 &&
                            data[k].low < data[k - 1].low &&
                            data[k].low < data[k + 1].low) {
                            lows.push({ index: k, value: data[k].low });
                        }
                    }
                    // Need at least 2 lows to form an ascending trend
                    if (lows.length >= 2) {
                        // Check if lows are ascending
                        let ascending = true;
                        for (let k = 1; k < lows.length; k++) {
                            if (lows[k].value <= lows[k - 1].value) {
                                ascending = false;
                                break;
                            }
                        }
                        if (ascending) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    // Descending Triangle pattern detection (bearish pattern)
    static checkDescendingTriangle(data) {
        if (data.length < 15)
            return false;
        // For descending triangle, we need at least two similar lows and descending highs
        const lows = [];
        for (let i = 2; i < data.length - 2; i++) {
            if (data[i].low < data[i - 1].low &&
                data[i].low < data[i - 2].low &&
                data[i].low < data[i + 1].low &&
                data[i].low < data[i + 2].low) {
                lows.push({ index: i, value: data[i].low });
            }
        }
        if (lows.length < 2)
            return false;
        // Check for similar lows (support line)
        for (let i = 0; i < lows.length - 1; i++) {
            for (let j = i + 1; j < lows.length; j++) {
                const lowDiff = Math.abs(lows[i].value - lows[j].value);
                const avgLow = (lows[i].value + lows[j].value) / 2;
                const lowDiffPercent = (lowDiff / avgLow) * 100;
                // If we have similar lows that are at least 5 bars apart
                if (lowDiffPercent < 3 && Math.abs(lows[j].index - lows[i].index) > 5) {
                    // Check for descending highs between these lows
                    const highs = [];
                    for (let k = lows[i].index; k <= lows[j].index; k++) {
                        if (k > 1 && k < data.length - 2 &&
                            data[k].high > data[k - 1].high &&
                            data[k].high > data[k + 1].high) {
                            highs.push({ index: k, value: data[k].high });
                        }
                    }
                    // Need at least 2 highs to form a descending trend
                    if (highs.length >= 2) {
                        // Check if highs are descending
                        let descending = true;
                        for (let k = 1; k < highs.length; k++) {
                            if (highs[k].value >= highs[k - 1].value) {
                                descending = false;
                                break;
                            }
                        }
                        if (descending) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    // Symmetrical Triangle pattern detection
    static checkSymmetricalTriangle(data) {
        if (data.length < 15)
            return false;
        // For symmetrical triangle, we need descending highs and ascending lows
        const highs = [];
        for (let i = 2; i < data.length - 2; i++) {
            if (data[i].high > data[i - 1].high &&
                data[i].high > data[i - 2].high &&
                data[i].high > data[i + 1].high &&
                data[i].high > data[i + 2].high) {
                highs.push({ index: i, value: data[i].high });
            }
        }
        const lows = [];
        for (let i = 2; i < data.length - 2; i++) {
            if (data[i].low < data[i - 1].low &&
                data[i].low < data[i - 2].low &&
                data[i].low < data[i + 1].low &&
                data[i].low < data[i + 2].low) {
                lows.push({ index: i, value: data[i].low });
            }
        }
        // Need at least 2 highs and 2 lows
        if (highs.length < 2 || lows.length < 2)
            return false;
        // Check for descending highs
        let descendingHighs = true;
        for (let i = 1; i < highs.length; i++) {
            if (highs[i].value >= highs[i - 1].value) {
                descendingHighs = false;
                break;
            }
        }
        // Check for ascending lows
        let ascendingLows = true;
        for (let i = 1; i < lows.length; i++) {
            if (lows[i].value <= lows[i - 1].value) {
                ascendingLows = false;
                break;
            }
        }
        // Both conditions must be true for a symmetrical triangle
        return descendingHighs && ascendingLows;
    }
    // Bullish Flag pattern detection (bullish pattern)
    static checkBullFlag(data) {
        if (data.length < 15)
            return false;
        // We need a strong uptrend (flag pole) followed by a short consolidation (flag)
        // First, find a significant uptrend (pole)
        let poleStart = -1;
        let poleEnd = -1;
        // Look for a strong upward move (at least 5% in a short period)
        for (let i = 5; i < data.length - 5; i++) {
            const startPrice = data[i - 5].close;
            const endPrice = data[i].close;
            const percentChange = ((endPrice - startPrice) / startPrice) * 100;
            if (percentChange > 5) {
                poleStart = i - 5;
                poleEnd = i;
                break;
            }
        }
        if (poleStart === -1)
            return false;
        // Look for a consolidation period after the pole (flag)
        // Flag should be a slight downtrend or sideways movement
        if (poleEnd + 5 >= data.length)
            return false;
        const flagPeriod = Math.min(5, data.length - poleEnd - 1);
        const flagStart = poleEnd;
        const flagEnd = flagStart + flagPeriod;
        // Calculate the slope of the flag
        const flagStartPrice = data[flagStart].close;
        const flagEndPrice = data[flagEnd].close;
        const flagSlope = (flagEndPrice - flagStartPrice) / flagPeriod;
        // Flag should be flat or slightly downward
        if (flagSlope > 0.001 * flagStartPrice)
            return false;
        // Calculate the volatility during the flag period
        let sumSquaredDeviations = 0;
        const meanPrice = data.slice(flagStart, flagEnd + 1).reduce((sum, d) => sum + d.close, 0) / (flagPeriod + 1);
        for (let i = flagStart; i <= flagEnd; i++) {
            sumSquaredDeviations += Math.pow(data[i].close - meanPrice, 2);
        }
        const volatility = Math.sqrt(sumSquaredDeviations / (flagPeriod + 1)) / meanPrice;
        // Flag should have lower volatility than the pole
        const poleVolatility = this.calculateVolatility(data, poleStart, poleEnd);
        return volatility < poleVolatility;
    }
    // Bear Flag pattern detection (bearish pattern)
    static checkBearFlag(data) {
        if (data.length < 15)
            return false;
        // We need a strong downtrend (flag pole) followed by a short consolidation (flag)
        // First, find a significant downtrend (pole)
        let poleStart = -1;
        let poleEnd = -1;
        // Look for a strong downward move (at least 5% in a short period)
        for (let i = 5; i < data.length - 5; i++) {
            const startPrice = data[i - 5].close;
            const endPrice = data[i].close;
            const percentChange = ((endPrice - startPrice) / startPrice) * 100;
            if (percentChange < -5) {
                poleStart = i - 5;
                poleEnd = i;
                break;
            }
        }
        if (poleStart === -1)
            return false;
        // Look for a consolidation period after the pole (flag)
        // Flag should be a slight uptrend or sideways movement
        if (poleEnd + 5 >= data.length)
            return false;
        const flagPeriod = Math.min(5, data.length - poleEnd - 1);
        const flagStart = poleEnd;
        const flagEnd = flagStart + flagPeriod;
        // Calculate the slope of the flag
        const flagStartPrice = data[flagStart].close;
        const flagEndPrice = data[flagEnd].close;
        const flagSlope = (flagEndPrice - flagStartPrice) / flagPeriod;
        // Flag should be flat or slightly upward
        if (flagSlope < -0.001 * flagStartPrice)
            return false;
        // Calculate the volatility during the flag period
        let sumSquaredDeviations = 0;
        const meanPrice = data.slice(flagStart, flagEnd + 1).reduce((sum, d) => sum + d.close, 0) / (flagPeriod + 1);
        for (let i = flagStart; i <= flagEnd; i++) {
            sumSquaredDeviations += Math.pow(data[i].close - meanPrice, 2);
        }
        const volatility = Math.sqrt(sumSquaredDeviations / (flagPeriod + 1));
        // Flag should have lower volatility than the pole
        const poleVolatility = this.calculateVolatility(data, poleStart, poleEnd);
        return volatility < poleVolatility;
    }
    // Check for bullish engulfing pattern (bullish pattern)
    static checkBullishEngulfing(data) {
        if (data.length < 5)
            return false;
        // Look for bullish engulfing in the last 10 candles
        const startIdx = Math.max(0, data.length - 10);
        for (let i = startIdx + 1; i < data.length; i++) {
            const prevCandle = data[i - 1];
            const currCandle = data[i];
            // Previous candle is bearish (close < open)
            const prevBearish = prevCandle.close < prevCandle.open;
            // Current candle is bullish (close > open)
            const currBullish = currCandle.close > currCandle.open;
            // Current candle engulfs previous candle
            const engulfs = currCandle.open < prevCandle.close && currCandle.close > prevCandle.open;
            if (prevBearish && currBullish && engulfs) {
                return true;
            }
        }
        return false;
    }
    // Check for bearish engulfing pattern (bearish pattern)
    static checkBearishEngulfing(data) {
        if (data.length < 5)
            return false;
        // Look for bearish engulfing in the last 10 candles
        const startIdx = Math.max(0, data.length - 10);
        for (let i = startIdx + 1; i < data.length; i++) {
            const prevCandle = data[i - 1];
            const currCandle = data[i];
            // Previous candle is bullish (close > open)
            const prevBullish = prevCandle.close > prevCandle.open;
            // Current candle is bearish (close < open)
            const currBearish = currCandle.close < currCandle.open;
            // Current candle engulfs previous candle
            const engulfs = currCandle.open > prevCandle.close && currCandle.close < prevCandle.open;
            if (prevBullish && currBearish && engulfs) {
                return true;
            }
        }
        return false;
    }
    // Check for cup and handle pattern (bullish pattern)
    static checkCupAndHandle(data) {
        if (data.length < 20)
            return false;
        // Simplified cup and handle detection
        // Look for a U-shaped pattern followed by a small downward drift
        // First find a high point
        let highPoint = -1;
        for (let i = 5; i < data.length - 15; i++) {
            if (data[i].high > data[i - 1].high &&
                data[i].high > data[i - 2].high &&
                data[i].high > data[i + 1].high &&
                data[i].high > data[i + 2].high) {
                highPoint = i;
                break;
            }
        }
        if (highPoint === -1)
            return false;
        // Look for a low point after the high point
        let lowPoint = -1;
        for (let i = highPoint + 3; i < data.length - 10; i++) {
            if (data[i].low < data[i - 1].low &&
                data[i].low < data[i - 2].low &&
                data[i].low < data[i + 1].low &&
                data[i].low < data[i + 2].low) {
                lowPoint = i;
                break;
            }
        }
        if (lowPoint === -1)
            return false;
        // Look for a second high point similar to the first
        let secondHighPoint = -1;
        for (let i = lowPoint + 3; i < data.length - 5; i++) {
            if (data[i].high > data[i - 1].high &&
                data[i].high > data[i - 2].high &&
                data[i].high > data[i + 1].high &&
                data[i].high > data[i + 2].high) {
                // Check if this high is similar to the first high
                const priceDiff = Math.abs(data[i].high - data[highPoint].high);
                const avgPrice = (data[i].high + data[highPoint].high) / 2;
                const percentDiff = (priceDiff / avgPrice) * 100;
                if (percentDiff < 3) {
                    secondHighPoint = i;
                    break;
                }
            }
        }
        if (secondHighPoint === -1)
            return false;
        // Look for a small pullback (handle) after the second high
        let handleFound = false;
        for (let i = secondHighPoint + 1; i < data.length - 2; i++) {
            if (data[i].low < data[secondHighPoint].low && data[i].low > data[lowPoint].low) {
                handleFound = true;
                break;
            }
        }
        return handleFound;
    }
    // Helper method to calculate volatility
    static calculateVolatility(data, start, end) {
        const period = end - start + 1;
        const prices = data.slice(start, end + 1).map((d) => d.close);
        const meanPrice = prices.reduce((sum, price) => sum + price, 0) / period;
        let sumSquaredDeviations = 0;
        for (const price of prices) {
            sumSquaredDeviations += Math.pow(price - meanPrice, 2);
        }
        return Math.sqrt(sumSquaredDeviations / period) / meanPrice;
    }
    // Helper methods to find extremes between two points
    static findLowestBetween(data, start, end) {
        let lowestIndex = start;
        for (let i = start + 1; i <= end; i++) {
            if (data[i].low < data[lowestIndex].low) {
                lowestIndex = i;
            }
        }
        return lowestIndex;
    }
    static findHighestBetween(data, start, end) {
        let highestIndex = start;
        for (let i = start + 1; i <= end; i++) {
            if (data[i].high > data[highestIndex].high) {
                highestIndex = i;
            }
        }
        return highestIndex;
    }
    // Helper: Calculate MACD (12-day EMA - 26-day EMA) and Signal Line (9-day EMA of MACD)
    static calculateMACD(data) {
        const closePrices = data.map((d) => d.close);
        // Calculate EMAs
        const ema12 = this.calculateEMA(closePrices, 12);
        const ema26 = this.calculateEMA(closePrices, 26);
        // Calculate MACD Line
        const macdLine = [];
        for (let i = 0; i < ema12.length; i++) {
            if (i < 26 - 12) {
                macdLine.push(0); // Padding for the first (26-12) days
            }
            else {
                macdLine.push(ema12[i] - ema26[i - (26 - 12)]);
            }
        }
        // Calculate Signal Line (9-day EMA of MACD)
        const signalLine = this.calculateEMA(macdLine.slice(26 - 12), 9);
        // Pad signal line to match macdLine length
        const paddedSignalLine = Array(26 - 12 + 9 - 1)
            .fill(0)
            .concat(signalLine);
        return {
            macdLine: macdLine,
            signalLine: paddedSignalLine,
        };
    }
    // Helper: Calculate Exponential Moving Average (EMA)
    static calculateEMA(prices, period) {
        const k = 2 / (period + 1);
        const ema = [prices[0]]; // Start with SMA for first value
        // Calculate SMA for first period
        if (prices.length >= period) {
            let sum = 0;
            for (let i = 0; i < period; i++) {
                sum += prices[i];
            }
            ema[0] = sum / period;
        }
        // Calculate EMA for remaining prices
        for (let i = 1; i < prices.length; i++) {
            ema.push(prices[i] * k + ema[i - 1] * (1 - k));
        }
        return ema;
    }
}
exports.StockService = StockService;
