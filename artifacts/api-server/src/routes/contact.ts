import { Router, type IRouter } from "express";
import { Resend } from "resend";

const router: IRouter = Router();

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "bangernargish@gmail.com";

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set.");
  return new Resend(key);
}

router.post("/contact", async (req, res) => {
  const { name, phone, email, city, subject, message } = req.body as {
    name?: string;
    phone?: string;
    email?: string;
    city?: string;
    subject?: string;
    message?: string;
  };

  if (!name || !phone || !subject || !message) {
    res.status(400).json({ error: "Required fields missing." });
    return;
  }

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
      <div style="background:#1e3a5f;padding:24px 32px;">
        <h1 style="color:#fff;margin:0;font-size:22px;">📩 New Contact Form Submission</h1>
        <p style="color:#cbd5e1;margin:6px 0 0;font-size:14px;">Adarsh Senior Secondary School, Jakhouli</p>
      </div>
      <div style="padding:28px 32px;background:#f8fafc;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;color:#64748b;font-size:13px;width:140px;vertical-align:top;">Full Name</td><td style="padding:10px 0;font-weight:600;color:#1e293b;">${name}</td></tr>
          <tr style="border-top:1px solid #e2e8f0;"><td style="padding:10px 0;color:#64748b;font-size:13px;vertical-align:top;">Phone</td><td style="padding:10px 0;font-weight:600;color:#1e293b;">${phone}</td></tr>
          ${email ? `<tr style="border-top:1px solid #e2e8f0;"><td style="padding:10px 0;color:#64748b;font-size:13px;vertical-align:top;">Email</td><td style="padding:10px 0;color:#1e293b;">${email}</td></tr>` : ""}
          ${city ? `<tr style="border-top:1px solid #e2e8f0;"><td style="padding:10px 0;color:#64748b;font-size:13px;vertical-align:top;">Village / City</td><td style="padding:10px 0;color:#1e293b;">${city}</td></tr>` : ""}
          <tr style="border-top:1px solid #e2e8f0;"><td style="padding:10px 0;color:#64748b;font-size:13px;vertical-align:top;">Subject</td><td style="padding:10px 0;color:#1e293b;"><span style="background:#dbeafe;color:#1e40af;padding:3px 10px;border-radius:20px;font-size:13px;">${subject}</span></td></tr>
          <tr style="border-top:1px solid #e2e8f0;"><td style="padding:10px 0;color:#64748b;font-size:13px;vertical-align:top;">Message</td><td style="padding:10px 0;color:#1e293b;line-height:1.6;">${message.replace(/\n/g, "<br>")}</td></tr>
        </table>
      </div>
      <div style="background:#1e3a5f;padding:14px 32px;text-align:center;">
        <p style="color:#94a3b8;font-size:12px;margin:0;">Adarsh Sr. Sec. School • Jakhouli Kassan Road, Jakhouli, Kaithal, Haryana</p>
      </div>
    </div>
  `;

  try {
    const { error } = await getResend().emails.send({
      from: "Adarsh School Website <onboarding@resend.dev>",
      to: [CONTACT_EMAIL],
      subject: `[School Website] ${subject} — ${name}`,
      html,
      replyTo: email ?? undefined,
    });

    if (error) {
      console.error("Resend error:", error);
      res.status(500).json({ error: "Failed to send email. Please try again." });
      return;
    }

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Contact route error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

export default router;
