import { Router, type IRouter } from "express";
import { Resend } from "resend";

const router: IRouter = Router();

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "bangernargish@gmail.com";

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set.");
  return new Resend(key);
}

router.post("/admission", async (req, res) => {
  const { studentName, dob, mobile, classApplying, village, email, parentName } = req.body as {
    studentName?: string;
    dob?: string;
    mobile?: string;
    classApplying?: string;
    village?: string;
    email?: string;
    parentName?: string;
  };

  if (!studentName || !dob || !mobile || !classApplying || !parentName) {
    res.status(400).json({ error: "Required fields missing." });
    return;
  }

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
      <div style="background:#1e3a5f;padding:24px 32px;">
        <h1 style="color:#fff;margin:0;font-size:22px;">🎓 New Admission Application</h1>
        <p style="color:#cbd5e1;margin:6px 0 0;font-size:14px;">Adarsh Senior Secondary School, Jakhouli — 2025-26</p>
      </div>
      <div style="padding:28px 32px;background:#f8fafc;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:11px 0;color:#64748b;font-size:13px;width:160px;vertical-align:top;border-bottom:1px solid #e2e8f0;">Student Name</td>
            <td style="padding:11px 0;font-weight:700;color:#1e293b;border-bottom:1px solid #e2e8f0;">${studentName}</td>
          </tr>
          <tr>
            <td style="padding:11px 0;color:#64748b;font-size:13px;vertical-align:top;border-bottom:1px solid #e2e8f0;">Date of Birth</td>
            <td style="padding:11px 0;color:#1e293b;border-bottom:1px solid #e2e8f0;">${dob}</td>
          </tr>
          <tr>
            <td style="padding:11px 0;color:#64748b;font-size:13px;vertical-align:top;border-bottom:1px solid #e2e8f0;">Parent / Guardian Name</td>
            <td style="padding:11px 0;font-weight:600;color:#1e293b;border-bottom:1px solid #e2e8f0;">${parentName}</td>
          </tr>
          <tr>
            <td style="padding:11px 0;color:#64748b;font-size:13px;vertical-align:top;border-bottom:1px solid #e2e8f0;">Mobile Number</td>
            <td style="padding:11px 0;color:#1e293b;border-bottom:1px solid #e2e8f0;">${mobile}</td>
          </tr>
          ${email ? `
          <tr>
            <td style="padding:11px 0;color:#64748b;font-size:13px;vertical-align:top;border-bottom:1px solid #e2e8f0;">Email Address</td>
            <td style="padding:11px 0;color:#1e293b;border-bottom:1px solid #e2e8f0;">${email}</td>
          </tr>` : ""}
          <tr>
            <td style="padding:11px 0;color:#64748b;font-size:13px;vertical-align:top;border-bottom:1px solid #e2e8f0;">Class Applying For</td>
            <td style="padding:11px 0;border-bottom:1px solid #e2e8f0;">
              <span style="background:#dbeafe;color:#1e40af;padding:4px 12px;border-radius:20px;font-size:13px;font-weight:600;">${classApplying}</span>
            </td>
          </tr>
          ${village ? `
          <tr>
            <td style="padding:11px 0;color:#64748b;font-size:13px;vertical-align:top;">Village / City</td>
            <td style="padding:11px 0;color:#1e293b;">${village}</td>
          </tr>` : ""}
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
      subject: `[Admission Application] ${studentName} — ${classApplying}`,
      html,
      replyTo: email ?? undefined,
    });

    if (error) {
      console.error("Resend admission error:", error);
      res.status(500).json({ error: "Failed to send. Please try again." });
      return;
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Admission route error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

export default router;
