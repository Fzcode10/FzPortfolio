const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Parse CLIENT_URL from environment or allow localhost defaults
const allowedOrigins = (
  process.env.CLIENT_URL
)
  .split(",")
  .map((url) => url.trim().replace(/\/$/, ""));

app.use(
  cors({
    origin: (origin, callback) => {
      
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // Allow any origin if in development or permissive fallback for hosting
      return callback(null, true);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Transporter configuration with Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("Mail Transporter verification failed:", error.message);
  } else {
    console.log("Mail Transporter is ready to send emails");
  }
});

// Utility to escape HTML and prevent injection in email
const escapeHtml = (text) => {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Health Check Endpoints
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "Portfolio Contact Backend",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Contact form API route
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (name, email, message).",
      });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject ? subject.trim() : "";
    const trimmedMessage = message.trim();

    const emailSubject = trimmedSubject
      ? `Portfolio Contact: ${trimmedSubject} (from ${trimmedName})`
      : `New Portfolio Message from ${trimmedName}`;

    // Mail options with both plaintext & responsive HTML template
    const mailOptions = {
      from: `"${trimmedName}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: trimmedEmail,
      subject: emailSubject,
      text: `You received a new message from your portfolio contact form:\n\n` +
        `Name: ${trimmedName}\n` +
        `Email: ${trimmedEmail}\n` +
        `Subject: ${trimmedSubject || "No subject provided"}\n\n` +
        `Message:\n${trimmedMessage}\n\n` +
        `Sent at: ${new Date().toLocaleString()}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 20px; color: #334155; }
            .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2); }
            .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%); padding: 28px 24px; color: #ffffff; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
            .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; }
            .content { padding: 24px; }
            .field { margin-bottom: 18px; }
            .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; font-weight: 700; }
            .field-value { margin-top: 4px; font-size: 15px; color: #0f172a; font-weight: 500; }
            .field-value a { color: #6366f1; text-decoration: none; }
            .message-box { margin-top: 6px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #6366f1; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; word-break: break-word; }
            .footer { padding: 16px 24px; background-color: #f1f5f9; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>📬 New Portfolio Inquiry</h1>
              <p>Received via your portfolio website contact form</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">Sender Name</div>
                <div class="field-value">${escapeHtml(trimmedName)}</div>
              </div>
              <div class="field">
                <div class="field-label">Sender Email</div>
                <div class="field-value"><a href="mailto:${escapeHtml(trimmedEmail)}">${escapeHtml(trimmedEmail)}</a></div>
              </div>
              ${
                trimmedSubject
                  ? `<div class="field">
                      <div class="field-label">Subject</div>
                      <div class="field-value">${escapeHtml(trimmedSubject)}</div>
                    </div>`
                  : ""
              }
              <div class="field">
                <div class="field-label">Message</div>
                <div class="message-box">${escapeHtml(trimmedMessage)}</div>
              </div>
            </div>
            <div class="footer">
              Hit <strong>Reply</strong> to respond directly to ${escapeHtml(trimmedEmail)}
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Email sending error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Portfolio backend running on port ${PORT}`);
});