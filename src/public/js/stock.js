// // src/public/js/stock.js
// document.getElementById("analyze-stock").addEventListener("click", async () => {
//     try {
//         const response = await fetch("/stocks/analyze-all", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//         });
//         const result = await response.json();

//         // Display the categorized stocks
//         const analysisResult = document.getElementById("analysis-result");
//         analysisResult.innerHTML = `
//             <h2>Analysis Result</h2>
//             <div class="category">
//                 <h3>Very Strong</h3>
//                 <ul>
//                     ${result.veryStrong.map(symbol => `<li>${symbol}</li>`).join("")}
//                 </ul>
//             </div>
//             <div class="category">
//                 <h3>Strong</h3>
//                 <ul>
//                     ${result.strong.map(symbol => `<li>${symbol}</li>`).join("")}
//                 </ul>
//             </div>
//             <div class="category">
//                 <h3>Solid</h3>
//                 <ul>
//                     ${result.solid.map(symbol => `<li>${symbol}</li>`).join("")}
//                 </ul>
//             </div>
//             <div class="category">
//                 <h3>Weak</h3>
//                 <ul>
//                     ${result.weak.map(symbol => `<li>${symbol}</li>`).join("")}
//                 </ul>
//             </div>
//         `;
//     } catch (error) {
//         console.error("Error analyzing stocks:", error);
//     }
// });


// Add this to your existing stock.js file

// Function to handle timeframe changes
function initTimeframeToggle() {
    const dailyButton = document.getElementById("daily-timeframe")
    const weeklyButton = document.getElementById("weekly-timeframe")
  
    if (dailyButton && weeklyButton) {
      dailyButton.addEventListener("click", () => changeTimeframe("daily"))
      weeklyButton.addEventListener("click", () => changeTimeframe("weekly"))
    }
  }
  
  function changeTimeframe(timeframe) {
    // Show loading indicator
    const loadingIndicator = document.getElementById("loading-indicator")
    if (loadingIndicator) {
      loadingIndicator.style.display = "block"
    }
  
    // Get the current URL and update or add the timeframe parameter
    const url = new URL(window.location.href)
    url.searchParams.set("timeframe", timeframe)
  
    // Redirect to the new URL
    window.location.href = url.toString()
  }
  
  // Initialize when the DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    initTimeframeToggle()
  })
  
  