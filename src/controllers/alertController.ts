import type { Request, Response } from "express"
import { AlertService } from "../services/alertService"

export const getAlerts = async (req: Request, res: Response) => {
    try {
        // Fetch all alerts
        const allAlerts = await AlertService.getAllAlerts();

        // Get the user from the request (assuming it's attached by your authentication middleware)
        const user = (req as any).user;

        // Render the alerts.ejs template and pass the required data
        res.render("alerts", {
            cssFile: "alerts",
            user, // Pass the user object to the template
            allAlerts, // Pass the alerts data to the template
        });
    } catch (error) {
        console.error("Error fetching alerts:", error);
        res.status(500).send("Error fetching alerts");
    }
};

export const getLatestAlerts = async (req: Request, res: Response) => {
  try {
    const latestAlerts = await AlertService.getLatestAlerts()
    res.json(latestAlerts)
  } catch (error) {
    console.error("Error fetching latest alerts:", error)
    res.status(500).json({ error: "Error fetching latest alerts" })
  }
}

export const runManualCheck = async (req: Request, res: Response) => {
  try {
    const newAlerts = await AlertService.fetchAlerts()
    await AlertService.notifyUsers(newAlerts)
    res.json({ message: "Manual check completed", newAlerts })
  } catch (error) {
    console.error("Error running manual check:", error)
    res.status(500).json({ error: "Error running manual check" })
  }
}

