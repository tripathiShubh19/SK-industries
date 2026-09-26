import nodemailer, { type Transporter } from 'nodemailer';

interface EmailPayload {
  to?: string;
  subject: string;
  html: string;
  replyTo?: string;
}

// Check if SMTP is configured in .env
const hasSmtpConfig = Boolean(
  process.env.SMTP_HOST &&
  process.env.SMTP_PORT &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS
);

let transporter: Transporter | null = null;

if (hasSmtpConfig) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * Send an email alert for new RFQs or Contact Form messages.
 * If SMTP is configured, sends via SMTP (Gmail, Zoho, Outlook, etc.).
 * If not configured, gracefully logs to server console in high-visibility format.
 */
export async function sendEmailAlert({ to, subject, html, replyTo }: EmailPayload): Promise<{ success: boolean; simulated?: boolean; messageId?: string }> {
  const recipient = to || process.env.FACTORY_ALERT_EMAIL || 'skindustrynoida@gmail.com';

  if (!hasSmtpConfig || !transporter) {
    console.log('\n======================================================');
    console.log('📨 [EMAIL SIMULATED / CONSOLE NOTIFICATION]');
    console.log(`To: ${recipient}`);
    console.log(`Subject: ${subject}`);
    if (replyTo) console.log(`Reply-To: ${replyTo}`);
    console.log('------------------------------------------------------');
    console.log(html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim());
    console.log('💡 TIP: Add SMTP credentials to backend/.env to send live emails via Gmail/Zoho/Outlook for free.');
    console.log('======================================================\n');
    return { success: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"SK Industry RFQ Desk" <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: replyTo,
      subject: subject,
      html: html,
    });
    console.log(`✅ [LIVE EMAIL SENT] ID: ${info.messageId} to ${recipient}`);
    return { success: true, simulated: false, messageId: info.messageId };
  } catch (error) {
    console.error('❌ [EMAIL SEND ERROR]:', error);
    return { success: false, simulated: false };
  }
}
