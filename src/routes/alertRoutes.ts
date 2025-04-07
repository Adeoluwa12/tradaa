import express from "express"
import { getAlerts, getLatestAlerts, runManualCheck } from "../controllers/alertController"
import { isAuthenticated } from "../middlewares/authMiddleware"

const router = express.Router()

router.get("/", isAuthenticated, getAlerts)
router.get("/latest", getLatestAlerts)
router.post("/manual-check", runManualCheck)

export default router

