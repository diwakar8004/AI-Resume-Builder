import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, name: string) {
  return resend.emails.send({
    from: 'ResumeAI <onboarding@resend.dev>',
    to,
    subject: 'Welcome to ResumeAI 🎉',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#0A0A18;font-family:Inter,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <!-- Logo -->
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:32px;">
      <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#4F46E5,#7C3AED);display:flex;align-items:center;justify-content:center;">
        <span style="color:white;font-size:18px;">✦</span>
      </div>
      <span style="font-size:22px;font-weight:800;color:white;">Resume<span style="color:#818CF8;">AI</span></span>
    </div>

    <!-- Card -->
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:36px;">
      <h1 style="font-size:26px;font-weight:800;color:white;margin:0 0 8px;">Welcome, ${name}! 🎉</h1>
      <p style="color:rgba(255,255,255,0.6);font-size:15px;line-height:1.6;margin:0 0 24px;">
        Your ResumeAI account is ready. Start building resumes that get you hired — powered by AI.
      </p>

      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
         style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#4F46E5,#7C3AED);color:white;font-size:14px;font-weight:700;border-radius:12px;text-decoration:none;">
        Open Dashboard →
      </a>

      <div style="margin-top:32px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);">
        <p style="color:rgba(255,255,255,0.4);font-size:13px;margin:0 0 12px;">What you can do with ResumeAI:</p>
        <div style="display:grid;gap:8px;">
          ${['🤖 AI-powered bullet point enhancement', '🎯 ATS score checker & optimizer', '📄 3 professional templates (Classic, Modern, Minimal)', '⚡ PDF export in seconds'].map(item => `
          <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:rgba(255,255,255,0.03);border-radius:10px;color:rgba(255,255,255,0.7);font-size:13px;">
            ${item}
          </div>`).join('')}
        </div>
      </div>
    </div>

    <p style="color:rgba(255,255,255,0.25);font-size:12px;text-align:center;margin-top:24px;">
      © 2025 ResumeAI · You received this because you created an account.
    </p>
  </div>
</body>
</html>
    `.trim(),
  });
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  return resend.emails.send({
    from: 'ResumeAI <no-reply@resend.dev>',
    to,
    subject: 'Reset your ResumeAI password',
    html: `
<body style="margin:0;padding:40px 24px;background:#0A0A18;font-family:Inter,sans-serif;">
  <div style="max-width:480px;margin:0 auto;">
    <h2 style="color:white;font-size:22px;font-weight:800;">Password Reset Request</h2>
    <p style="color:rgba(255,255,255,0.6);font-size:15px;line-height:1.6;">
      Click the button below to reset your password. This link expires in 1 hour.
    </p>
    <a href="${resetUrl}" style="display:inline-block;margin-top:16px;padding:14px 28px;background:linear-gradient(135deg,#4F46E5,#7C3AED);color:white;font-weight:700;border-radius:12px;text-decoration:none;font-size:14px;">
      Reset Password →
    </a>
    <p style="color:rgba(255,255,255,0.3);font-size:12px;margin-top:24px;">
      If you didn't request this, you can safely ignore this email.
    </p>
  </div>
</body>
    `.trim(),
  });
}
