document.addEventListener("DOMContentLoaded", () => {
    const manualCheckButton = document.getElementById("manualCheck");
    if (manualCheckButton) {
        manualCheckButton.addEventListener("click", async () => {
            try {
                const response = await fetch("/alerts/manual-check", { method: "POST" });
                const data = await response.json();
                alert(data.message);
                location.reload(); // Reload the page to show new alerts
            } catch (error) {
                console.error("Error running manual check:", error);
                alert("Error running manual check");
            }
        });
    }
});