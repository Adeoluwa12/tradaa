"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendEmail = async (mailOptions) => {
    try {
        // Ensure email has proper HTML content
        if (!mailOptions.html && mailOptions.text) {
            mailOptions.html = `
                <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; }
                            .alert-up { color: green; }
                            .alert-down { color: red; }
                            .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
                            .content { padding: 20px; }
                            .footer { background-color: #f8f9fa; padding: 10px; text-align: center; font-size: 12px; }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h2>Stock Alert Notification</h2>
                        </div>
                        <div class="content">
                            <h3>Latest Stock Alerts:</h3>
                            <pre>${mailOptions.text
                .split("\n")
                .map((line) => {
                if (line.includes("↑")) {
                    return `<div class="alert-up">${line}</div>`;
                }
                else if (line.includes("↓")) {
                    return `<div class="alert-down">${line}</div>`;
                }
                return line;
            })
                .join("\n")}</pre>
                        </div>
                        <div class="footer">
                            <p>This is an automated notification from your Stock Alert System.</p>
                        </div>
                    </body>
                </html>
            `;
        }
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
};
exports.sendEmail = sendEmail;
