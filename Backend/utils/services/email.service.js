import nodemailer from "nodemailer";

export function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

export async function sendResetPasswordEmail({ to, name, resetUrl }) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Reset your Study Guider password",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>Hello ${name || "there"},</h2>
        <p>You requested a password reset. Click the button below:</p>
        <p><a href="${resetUrl}" style="display:inline-block;padding:10px 14px;background:#111;color:#fff;text-decoration:none;border-radius:6px">Reset Password</a></p>
        <p>If you didn't request this, ignore this email.</p>
        <p>This link will expire soon.</p>
      </div>
    `
  });
}