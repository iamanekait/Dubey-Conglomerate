import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environmental parameters
dotenv.config();

const targetEmail = "aniketdubey.2012@gmail.com";

async function verifySMTPPipeline() {
  console.log("====================================================================");
  console.log("             DUBEY CONGLOMERATE CENTRAL MAIL VERIFICATION           ");
  console.log("====================================================================");

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  console.log(`📡 SMTP Target Node Coordinates:`);
  console.log(`   - Host: ${host}`);
  console.log(`   - Port: ${port}`);
  console.log(`   - Username/Sender: ${user || "NOT DEFINED"}`);
  console.log(`   - Token/Key: ${pass ? "●●●●●●●●●●●●" : "NOT DEFINED"}`);
  console.log(`   - Security Type: ${port === 465 ? "SSL" : "STARTTLS"}`);
  console.log(`   - Destination Inbox: ${targetEmail}`);
  console.log("--------------------------------------------------------------------");

  if (!user || !pass) {
    console.error("❌ CRITICAL CONFIGURATION FAULT:");
    console.error("   - SMTP_USER and SMTP_PASS variables must be correctly configured inside your environment secrets or /.env file.");
    console.error("   - Please check your application settings and retry.");
    process.exit(1);
  }

  // Set up the high-fidelity mail transporter
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
    // Adding short timeouts to fail-safe connection lags
    connectionTimeout: 10000, 
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  try {
    console.log("⏳ Attempting safe handshake authentication with secure mail gateway...");
    await transporter.verify();
    console.log("✅ SUCCESS: Authentic mail transport validated successfully! Handshake complete.");
    console.log("--------------------------------------------------------------------");
  } catch (authError: any) {
    console.error("❌ MAIL SERVER CONNECTION OR HANDSHAKE REFUSED:");
    console.error(`   - Diagnostic Message: ${authError?.message || authError}`);
    console.error("\n💡 TROUBLESHOOTING ACTIONS:");
    console.error("   1. If using Gmail, make sure you generated an **App Password**.");
    console.error("      - Ordinary Gmail login passwords are NOT accepted by Google SMTP.");
    console.error("      - Visit Page: https://myaccount.google.com/apppasswords to construct a 16-character credential key.");
    console.error("   2. Verify that two-factor authentication (2FA) is turned on for your account.");
    console.error("   3. Check your network or firewall rules to see if port 587 or 465 is blocked.");
    process.exit(1);
  }

  // Construct a premium, military-grade administrative report notification layout
  const verificationMailHTML = `
    <div style="font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050B18; color: #ffffff; padding: 40px 30px; border-radius: 20px; border: 1px solid #D4AF37; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
      
      <!-- Monogram Header Branding block -->
      <div style="text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 25px; margin-bottom: 30px;">
        <span style="font-size: 26px; font-weight: 850; letter-spacing: 5px; color: #D4AF37; text-transform: uppercase;">DC</span>
        <h2 style="color: #ffffff; margin: 8px 0 0; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">DUBEY CONGLOMERATE</h2>
        <p style="color: #D4AF37; font-size: 10px; font-weight: 600; margin: 4px 0 0; font-family: monospace; letter-spacing: 1.5px; opacity: 0.8;">CENTRAL COMMUNICATION GATEWAY TEST</p>
      </div>
      
      <!-- Core Alert Message -->
      <div style="text-align: center; margin-bottom: 35px;">
        <div style="display: inline-block; background-color: rgba(212, 175, 55, 0.1); border: 1px solid #D4AF37; padding: 12px 24px; border-radius: 50px; margin-bottom: 20px;">
          <span style="color: #D4AF37; font-size: 11px; font-family: monospace; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase;">📡 LINK FULLY OPERATIONAL</span>
        </div>
        <p style="font-size: 15px; line-height: 1.6; color: rgba(255, 255, 255, 0.9); margin: 0 auto; max-width: 480px; font-weight: 300;">
          This secure transmission confirms the successful mapping and deployment of your automated corporate communications pipeline for <strong>Dubey Conglomerate</strong>.
        </p>
      </div>

      <!-- Tactical Connection Metadata Records Table -->
      <h3 style="font-size: 11px; font-family: monospace; color: #D4AF37; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 8px; margin-bottom: 15px;">Dossier Link Metadata</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 35px;">
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="padding: 12px 0; font-weight: bold; font-size: 11px; font-family: monospace; text-transform: uppercase; color: #ffffff; opacity: 0.5; width: 40%;">Strategic Routing Gate</td>
          <td style="padding: 12px 0; font-size: 13px; color: #ffffff; font-family: monospace;">${host}:${port}</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="padding: 12px 0; font-weight: bold; font-size: 11px; font-family: monospace; text-transform: uppercase; color: #ffffff; opacity: 0.5;">Authorized Account</td>
          <td style="padding: 12px 0; font-size: 13px; color: #ffffff; font-family: monospace;">${user}</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="padding: 12px 0; font-weight: bold; font-size: 11px; font-family: monospace; text-transform: uppercase; color: #ffffff; opacity: 0.5;">Target Destination</td>
          <td style="padding: 12px 0; font-size: 13px; color: #D4AF37; font-weight: 700; font-family: monospace;">${targetEmail}</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="padding: 12px 0; font-weight: bold; font-size: 11px; font-family: monospace; text-transform: uppercase; color: #ffffff; opacity: 0.5;">Transport Layer Secure</td>
          <td style="padding: 12px 0; font-size: 13px; color: #ffffff;">Handshake Authenticated & Verified (TLS)</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="padding: 12px 0; font-weight: bold; font-size: 11px; font-family: monospace; text-transform: uppercase; color: #ffffff; opacity: 0.5;">Timestamp Coordinates</td>
          <td style="padding: 12px 0; font-size: 13px; color: #ffffff; font-family: monospace;">${new Date().toString()}</td>
        </tr>
      </table>

      <!-- Operation confirmation reminder/instruction -->
      <div style="background-color: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.06); padding: 20px; border-radius: 12px; margin-bottom: 30px;">
        <h4 style="margin: 0 0 8px 0; font-size: 12px; font-family: monospace; text-transform: uppercase; color: #D4AF37; font-weight: bold; letter-spacing: 1px;">⚙️ INCOMING FORM MONITORING</h4>
        <p style="margin: 0; font-size: 13px; line-height: 1.5; color: rgba(255, 255, 255, 0.75); font-weight: 300;">
          All client form submissions entered into either the <strong>Appointment Booking Scheduler</strong> or the <strong>Core Inquiries Dashboard</strong> are now instantly captured, converted into structured digital briefings, and dispatched straight to this inbox.
        </p>
      </div>

      <!-- Watermark footer -->
      <div style="font-size: 9.5px; color: rgba(255, 255, 255, 0.25); text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 20px; font-family: monospace; letter-spacing: 1.5px;">
        CONFIDENTIAL SECURITY ADVISORY REPORT REPORT CONTROL NO. DC-9981-A
      </div>
    </div>
  `;

  try {
    console.log(`📤 Dispatching test transmittal email envelope to: ${targetEmail}...`);
    const result = await transporter.sendMail({
      from: `"Dubey Conglomerate Secure Link" <${user}>`,
      to: targetEmail,
      subject: "🔔 [DC Link Established] Central Mail Routing Verification Success",
      html: verificationMailHTML,
    });

    console.log("--------------------------------------------------------------------");
    console.log("✨ SUCCESS: Operational verification email has been reliably sent!");
    console.log(`   - Message Identifier: ${result.messageId}`);
    console.log(`   - Response Envelope: ${result.response}`);
    console.log("====================================================================");
  } catch (mailError: any) {
    console.error("❌ DISPATCH TRANSMITTAL FAILED DURING FINAL TRANSFER:");
    console.error(`   - Reason: ${mailError?.message || mailError}`);
    console.error(`   - Error properties: ${JSON.stringify(mailError)}`);
    process.exit(1);
  }
}

// Execute connection diagnostics
verifySMTPPipeline();
