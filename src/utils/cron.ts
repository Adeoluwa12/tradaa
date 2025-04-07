import cron from "node-cron"
import { AlertService } from "../services/alertService"

export function startScheduledTasks() {
  // Run every 30 minutes
  cron.schedule("*/30 * * * *", async () => {
    console.log("Running scheduled alert check")
    try {
      const newAlerts = await AlertService.fetchAlerts()
      await AlertService.notifyUsers(newAlerts)
    } catch (error) {
      console.error("Error in scheduled alert check:", error)
    }
  })
}

