"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const stockRoutes_1 = __importDefault(require("./routes/stockRoutes"));
const alertRoutes_1 = __importDefault(require("./routes/alertRoutes"));
const reportRoutes_1 = __importDefault(require("./routes/reportRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const cron_1 = require("./utils/cron");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser")); // Import cookie-parser
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
// Set up cookie-parser
app.use((0, cookie_parser_1.default)());
// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views")); // Set the views directory
// Serve static files from the "public" directory
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Parse JSON and URL-encoded request bodies
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.get("/", (req, res) => {
    res.render("home", { cssFile: "home" }); // Render the home.ejs file
});
// Use authRoutes for /auth
app.use("/auth", authRoutes_1.default);
// Use dashboard routes
app.use("/dashboard", dashboardRoutes_1.default);
// Use other routes
app.use("/stocks", stockRoutes_1.default);
app.use("/alerts", alertRoutes_1.default);
app.use("/reports", reportRoutes_1.default);
// MongoDB Connection
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));
// Start Cron Jobs
(0, cron_1.startScheduledTasks)();
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
