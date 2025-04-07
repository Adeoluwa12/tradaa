// src/public/js/dashboard.js
function viewStockChart() {
    const symbol = "AAPL"; // Default stock symbol (can be dynamic)
    window.location.href = `/stocks/${symbol}`; // Redirect to stock page
}

function viewDailyReport() {
    window.location.href = "/reports"; // Redirect to report page
}

function viewAllAlerts() {
    window.location.href = "/alerts"
  }