// // src/routes/stockRoutes.ts
// import express from "express";
// import { StockService } from "../services/stockService";
// import { isAuthenticated } from "../middlewares/authMiddleware";

// const router = express.Router();

// // Render stock page with TradingView chart
// router.get("/:symbol", isAuthenticated, async (req, res) => {
//     const { symbol } = req.params;
//     const user = (req as any).user; // Get user from request
//     try {
//         // Fetch stock data for the chart
//         const chartData = await StockService.fetchStockData(symbol);

//         // Fetch analysis results for all stocks
//         const results = await StockService.analyzeAllStocks();

//         // Render the stock.ejs template and pass the required data
//         res.render("stock", {
//             cssFile: "stock",
//             symbol,
//             results, // Pass the results array to the template
//             chartData,
//             user,
//         });
//     } catch (error) {
//         console.error("Error fetching stock data:", error);
//         res.status(500).send("Error fetching stock chart");
//     }
// });

// // Analyze all stocks
// router.post("/analyze-all", isAuthenticated, async (req, res) => {
//     try {
//         const categorizedStocks = await StockService.analyzeAllStocks();
//         res.json(categorizedStocks);
//     } catch (error) {
//         console.error("Error analyzing stocks:", error);
//         res.status(500).json({ error: "Error analyzing stocks" });
//     }
// });

// export default router;


import express from "express"
import { StockService } from "../services/stockService"
import { isAuthenticated } from "../middlewares/authMiddleware"

const router = express.Router()

// Render stock page with TradingView chart
router.get("/:symbol", isAuthenticated, async (req, res) => {
  const { symbol } = req.params
  const timeframe = (req.query.timeframe as string) || "daily"
  const user = (req as any).user // Get user from request
  try {
    // Fetch stock data for the chart
    const chartData = await StockService.fetchStockData(symbol, timeframe)

    // Fetch analysis results for all stocks
    const results = await StockService.analyzeAllStocks(timeframe)

    // Render the stock.ejs template and pass the required data
    res.render("stock", {
      cssFile: "stock",
      symbol,
      timeframe,
      results, // Pass the results array to the template
      chartData,
      user,
    })
  } catch (error) {
    console.error("Error fetching stock data:", error)
    res.status(500).send("Error fetching stock chart")
  }
})

// Analyze all stocks
router.post("/analyze-all", isAuthenticated, async (req, res) => {
  try {
    const timeframe = req.body.timeframe || "daily"
    const categorizedStocks = await StockService.analyzeAllStocks(timeframe)
    res.json(categorizedStocks)
  } catch (error) {
    console.error("Error analyzing stocks:", error)
    res.status(500).json({ error: "Error analyzing stocks" })
  }
})

// Add a new endpoint to switch timeframes
router.get("/timeframe/:timeframe", isAuthenticated, async (req, res): Promise<any> => {
  try {
    const { timeframe } = req.params
    if (timeframe !== "daily" && timeframe !== "weekly") {
      return res.status(400).json({ error: "Invalid timeframe. Use 'daily' or 'weekly'" })
    }

    const results = await StockService.analyzeAllStocks(timeframe)
    res.json({ success: true, timeframe, results })
  } catch (error) {
    console.error("Error switching timeframe:", error)
    res.status(500).json({ error: "Error switching timeframe" })
  }
})

export default router


// import express from 'express';
// import { StockService } from '../services/stockService';
// import { isAuthenticated } from '../middlewares/authMiddleware';

// const router = express.Router();

// router.get('/:symbol', isAuthenticated, async (req, res) => {
//   const { symbol } = req.params;
//   const timeframe = (req.query.timeframe as string) || 'daily';

//   try {
//     const [chartData, analysis] = await Promise.all([
//       StockService.fetchStockData(symbol, timeframe),
//       StockService.analyzeAllStocks(timeframe)
//     ]);

//     res.render('stock', {
//       symbol,
//       timeframe,
//       chartData,
//       analysis,
//       currentStock: analysis.find(s => s.symbol === symbol),
//       user: (req as any).user
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Analysis failed");
//   }
// });

// router.post('/analyze-all', isAuthenticated, async (req, res) => {
//   try {
//     const timeframe = req.body.timeframe || 'daily';
//     const results = await StockService.analyzeAllStocks(timeframe);
//     res.json(results);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Analysis failed" });
//   }
// });

// export default router;