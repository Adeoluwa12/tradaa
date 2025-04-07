import type { Request, Response } from "express"
import { AlertService } from "../services/alertService"

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const latestAlerts = await AlertService.getLatestAlerts(5) // Get the 5 most recent alerts
    res.render("dashboard", {
      user: (req as any).user, // Assuming you have user data in the request
      latestAlerts: latestAlerts,
      cssFile: "dashboard"
    })
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    res.status(500).send("Error loading dashboard")
  }
}

