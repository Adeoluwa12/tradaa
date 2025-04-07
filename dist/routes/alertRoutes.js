"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const alertController_1 = require("../controllers/alertController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.get("/", authMiddleware_1.isAuthenticated, alertController_1.getAlerts);
router.get("/latest", alertController_1.getLatestAlerts);
router.post("/manual-check", alertController_1.runManualCheck);
exports.default = router;
