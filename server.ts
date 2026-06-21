import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY secret is not configured yet. Please configure it in Settings > Secrets to enable AI advisory chats.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Dubey Conglomerate Advisory Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const client = getGeminiClient();

      const systemInstruction = `You are a highly premium AI Corporate Ambassador and Senior Strategic Advisor for Dubey Conglomerate (DC), a top-tier management consulting and multidisciplinary advisory firm in West Bengal led by Mr. Aniket Dubey.
We offer high-impact operational upgrades, EBITDA expansions, digital transformation sprints, working capital calibrations, and custom standard operating procedures (SOPs).
Always respond with professional poise, executive precision, and elegant business clarity. 
Keep your answers brief, engaging, strategic, and direct. Use bullet points for structured recommendations, but keep total length under 150 words.
Address the user as a respected client, and if relevant, kindly guide them to "Schedule a Strategic Audit" or use the assessment tool on our website.`;

      const formattedHistory = (history || []).map((h: { role: string; content: string }) => ({
        role: h.role === "assistant" ? "model" : h.role,
        parts: [{ text: h.content }]
      }));

      const contents = [
        ...formattedHistory,
        { role: "user", parts: [{ text: message }] }
      ];

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "I apologize, I was unable to compile an executive response. Please try again or contact our administration directly.";
      res.json({ text: replyText });
    } catch (error: any) {
      console.error("Advisory Chat Error:", error);
      res.status(500).json({ error: error?.message || "An unexpected error occurred in our advisory server layer." });
    }
  });

  // Helper utility to dispatch premium styled email updates regarding inquiries and schedulers
  async function sendEmailNotification(subject: string, htmlContent: string) {
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    const destinations = "aniketdubey.2012@gmail.com, aniketdueby.2012@gmail.com";
    console.log(`[Email System] Preparing to dispatch notification: "${subject}" to ${destinations}`);

    if (!user || !pass) {
      console.log(`[Email System][SIMULATION MODE] No SMTP_USER or SMTP_PASS configured in settings secrets. Outputting email details to logs.`);
      console.log("------------------- LOGGED EMAIL OUTBOX -------------------");
      console.log(`Destination: ${destinations}`);
      console.log(`Subject: ${subject}`);
      console.log(`Payload Text-Content:\n${htmlContent.replace(/<[^>]*>/g, "\n").replace(/\n+/g, "\n").trim()}`);
      console.log("-----------------------------------------------------------");
      return { simulated: true };
    }

    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: {
          user,
          pass,
        },
      });

      const info = await transporter.sendMail({
        from: `"Dubey Conglomerate Secure" <${user}>`,
        to: destinations,
        subject,
        html: htmlContent,
      });

      console.log(`[Email System] Message successfully dispatched under id: ${info.messageId}`);
      return { simulated: false, messageId: info.messageId };
    } catch (error: any) {
      console.error("[Email System][CRITICAL] Failed to dispatch via SMTP transport:", error);
      throw error;
    }
  }

  // API Route for submitting booking/inquiry forms and sending email coordinates to aniketdubey.2012@gmail.com and aniketdueby.2012@gmail.com
  app.post("/api/submit-form", async (req, res) => {
    try {
      const { formType, payload } = req.body;

      if (!formType || !payload) {
        return res.status(400).json({ error: "Missing required form payload metadata." });
      }

      console.log(`[Form Receiver] Received form of type ${formType}`);

      let subject = "";
      let htmlContent = "";

      if (formType === "booking") {
        const { name, email, phone, company, service, date, timeSlot, notes } = payload;
        subject = `[DC scheduler] New Booking Alert: ${company} (${name})`;
        htmlContent = `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050B18; color: #ffffff; padding: 30px; border-radius: 16px; border: 1px solid #D4AF37;">
            <div style="text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 20px; margin-bottom: 25px;">
              <h2 style="color: #D4AF37; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 2px;">DUBEY CONGLOMERATE</h2>
              <p style="color: #ffffff; font-size: 11px; font-weight: 300; margin: 5px 0 0; font-family: monospace; letter-spacing: 1px;">SECURE SCHEDULER DISPATCH</p>
            </div>
            
            <p style="font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.85); margin-bottom: 20px;">
              A new high-priority board consultation has been successfully requested. Key coordinates are cataloged below:
            </p>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 10px 0; font-weight: bold; font-size: 12px; font-family: monospace; text-transform: uppercase; color: #D4AF37; width: 35%;">Principal Applicant</td>
                <td style="padding: 10px 0; font-size: 14px; color: #ffffff;">${name || "N/A"}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 10px 0; font-weight: bold; font-size: 12px; font-family: monospace; text-transform: uppercase; color: #D4AF37;">Enterprise Name</td>
                <td style="padding: 10px 0; font-size: 14px; color: #ffffff;">${company || "N/A"}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 10px 0; font-weight: bold; font-size: 12px; font-family: monospace; text-transform: uppercase; color: #D4AF37;">Institutional Email</td>
                <td style="padding: 10px 0; font-size: 14px; color: #ffffff;"><a href="mailto:${email}" style="color: #D4AF37; text-decoration: none;">${email || "N/A"}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 10px 0; font-weight: bold; font-size: 12px; font-family: monospace; text-transform: uppercase; color: #D4AF37;">Primary Phone</td>
                <td style="padding: 10px 0; font-size: 14px; color: #ffffff;">${phone || "N/A"}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 10px 0; font-weight: bold; font-size: 12px; font-family: monospace; text-transform: uppercase; color: #D4AF37;">Subject Matter</td>
                <td style="padding: 10px 0; font-size: 14px; color: #ffffff; font-weight: bold;">${service || "N/A"}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 10px 20px 10px 0; font-weight: bold; font-size: 12px; font-family: monospace; text-transform: uppercase; color: #D4AF37;">Scheduled Date</td>
                <td style="padding: 10px 0; font-size: 14px; color: #ffffff; font-weight: bold;">${date || "N/A"}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 10px 0; font-weight: bold; font-size: 12px; font-family: monospace; text-transform: uppercase; color: #D4AF37;">Time Slot</td>
                <td style="padding: 10px 0; font-size: 14px; color: #ffffff;">${timeSlot || "N/A"}</td>
              </tr>
            </table>

            <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); padding: 15px; border-radius: 8px; margin-bottom: 25px;">
              <p style="margin: 0 0 5px 0; font-size: 11px; font-family: monospace; text-transform: uppercase; color: #D4AF37; font-weight: bold;">PRELIMINARY BRIEFING OUTLINE</p>
              <p style="margin: 0; font-size: 13px; line-height: 1.5; color: rgba(255, 255, 255, 0.85); font-style: italic;">"${notes || "No additional briefing outline provided."}"</p>
            </div>

            <div style="font-size: 10px; color: rgba(255, 255, 255, 0.3); text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 15px;">
              SECURE SYSTEM SYSTEM LOG DISPATCH • DURGAPUR INDUSTRIAL ZONE
            </div>
          </div>
        `;
      } else {
        const { name, email, phone, company, message } = payload;
        subject = `[DC dossier] New Central Registry Inquiry: ${company}`;
        htmlContent = `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050B18; color: #ffffff; padding: 30px; border-radius: 16px; border: 1px solid #D4AF37;">
            <div style="text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 20px; margin-bottom: 25px;">
              <h2 style="color: #D4AF37; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 2px;">DUBEY CONGLOMERATE</h2>
              <p style="color: #ffffff; font-size: 11px; font-weight: 300; margin: 5px 0 0; font-family: monospace; letter-spacing: 1px;">CENTRAL REGISTRY DISPATCH</p>
            </div>
            
            <p style="font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.85); margin-bottom: 20px;">
              A confidential strategic review dossier brief has been filed in the communications pipeline:
            </p>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 10px 0; font-weight: bold; font-size: 12px; font-family: monospace; text-transform: uppercase; color: #D4AF37; width: 35%;">Sender Name</td>
                <td style="padding: 10px 0; font-size: 14px; color: #ffffff;">${name || "N/A"}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 10px 0; font-weight: bold; font-size: 12px; font-family: monospace; text-transform: uppercase; color: #D4AF37;">Enterprise Legal Name</td>
                <td style="padding: 10px 0; font-size: 14px; color: #ffffff;">${company || "N/A"}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 10px 0; font-weight: bold; font-size: 12px; font-family: monospace; text-transform: uppercase; color: #D4AF37;">Primary Email</td>
                <td style="padding: 10px 0; font-size: 14px; color: #ffffff;"><a href="mailto:${email}" style="color: #D4AF37; text-decoration: none;">${email || "N/A"}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 10px 0; font-weight: bold; font-size: 12px; font-family: monospace; text-transform: uppercase; color: #D4AF37;">Contact Phone</td>
                <td style="padding: 10px 0; font-size: 14px; color: #ffffff;">${phone || "N/A"}</td>
              </tr>
            </table>

            <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); padding: 15px; border-radius: 8px; margin-bottom: 25px;">
              <p style="margin: 0 0 5px 0; font-size: 11px; font-family: monospace; text-transform: uppercase; color: #D4AF37; font-weight: bold;">OBJECTIVES & BRIEF STATEMENT</p>
              <p style="margin: 0; font-size: 13px; line-height: 1.5; color: rgba(255, 255, 255, 0.85); white-space: pre-wrap;">"${message || "No briefing text registered."}"</p>
            </div>

            <div style="font-size: 10px; color: rgba(255, 255, 255, 0.3); text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 15px;">
              SECURE SYSTEM SYSTEM LOG DISPATCH • DURGAPUR INDUSTRIAL ZONE
            </div>
          </div>
        `;
      }

      const emailStatus = await sendEmailNotification(subject, htmlContent);
      res.json({ success: true, ...emailStatus });
    } catch (e: any) {
      console.error("[Form Receiver Error]", e);
      res.status(500).json({ error: e?.message || "Failed to catalog or notify of form submission." });
    }
  });

  // Vite middleware for development or Static Assets for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical: Failed to boot Dubey Conglomerate server container:", err);
});
