import { User } from "../Auth/auth-client";
import { sendMail } from "./send-mail";

type UserMail = Partial<User>

const generateHtml = async (user: UserMail, url: string, token: string) => {
  return (`
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Verify your email</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f6f7fb;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      color: #0f172a;
    }
    .container {
      width: 100%;
      max-width: 680px;
      margin: 24px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 24px rgba(15,23,42,0.08);
    }
    .inner {
      padding: 28px;
    }
    .brand {
      text-align: center;
      padding: 20px 28px 0 28px;
    }
    .brand h1 {
      margin: 0;
      font-size: 20px;
      letter-spacing: -0.02em;
      color: #0f172a;
    }
    .lead {
      font-size: 16px;
      line-height: 1.5;
      margin: 0 0 18px 0;
      color: #0f172a;
    }
    .btn-wrap {
      text-align: center;
      margin: 22px 0;
    }
    .cta {
      display: inline-block;
      background: linear-gradient(90deg,#2563eb,#7c3aed);
      color: #fff !important;
      text-decoration: none;
      padding: 12px 20px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 15px;
    }
    .muted {
      color: #475569;
      font-size: 13px;
      line-height: 1.4;
    }
    .token {
      display: inline-block;
      background: #f1f5f9;
      color: #0f172a;
      padding: 8px 10px;
      border-radius: 6px;
      font-family: monospace;
      font-size: 12px;
      word-break: break-all;
      margin-top: 8px;
    }
    .footer {
      padding: 18px 28px;
      background: #f8fafc;
      font-size: 13px;
      color: #64748b;
      text-align: center;
    }
    a.fallback {
      word-break: break-all;
      color: #2563eb;
    }
    @media (max-width: 520px) {
      .inner { padding: 18px; }
      .brand h1 { font-size: 18px; }
      .lead { font-size: 15px; }
      .cta { width: 100%; display: inline-block; padding: 12px; border-radius: 8px; }
    }
  </style>
</head>
<body>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <div class="container" role="article" aria-roledescription="email">
          <div class="brand">
            <h1>LitLearn</h1>
          </div>

          <div class="inner">
            <p class="lead">
              Hi <strong>${user.name}</strong>,
            </p>

            <p class="muted">
              Thanks for creating an account at LitLearn. Please confirm your email address so you can start creating and enjoying content.
            </p>

            <div class="btn-wrap">
              <a class="cta" href="${url}" target="_blank" rel="noopener noreferrer">
                Verify your email
              </a>
            </div>

            <p class="muted">
              If the button doesn't work, copy and paste the URL below into your browser:
            </p>
            <p class="muted token">
              <a href="${url}" class="fallback" target="_blank" rel="noopener noreferrer">${url}</a>
            </p>

            <p class="muted" style="margin-top:14px;">
              Or use this token manually if required:
            </p>
            <p class="token">${token}</p>

            <p class="muted" style="margin-top:18px;">
              If you did not sign up for a LitLearn account, you can safely ignore this message.
            </p>

            <hr style="border:none;border-top:1px solid #eef2f7;margin:20px 0" />

            <p class="muted" style="font-size:13px">
              Need help? Reply to this email or contact our support at
              <a href="mailto:support@litlearn.example" class="fallback">support@litlearn.example</a>.
            </p>
          </div>

          <div class="footer">
            © ${new Date().getFullYear()} LitLearn — <span style="color:#94a3b8">Learn, write, share.</span>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`);
};


export const sendEmailVerificationMail = async ({ user, url, token }: { user: UserMail, url: string, token: string }) => {
  await sendMail({
    to: user.email as string,
    subject: "Verify your LitLearn account",
    html: await generateHtml(user, url, token),
  });
}