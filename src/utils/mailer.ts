import nodemailer from "nodemailer";
import config from "../config/index.js";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config.gmail_user,
    pass: config.gmail_pass,
  },
});

export const sendMail = async ({
  email,
  link,
}: {
  email: string;
  link: string;
}) => {
  await transporter.sendMail({
    from: config.gmail_user,
    to: email,
    subject: "Verify Your Email to login at MealHub",
    text: `
Verify your email

Click the link below to verify your email:
${link}

If you didn’t create this account, ignore this email.
`,
    html: `<p style="margin:0 0 24px; font-size:15px; color:#374151; line-height:1.6;"> Thanks for signing up! Please confirm your email address by clicking the button below. </p> <br/>
         <a href="${link}" style=" display:inline-block; padding:12px 22px; background:#2563eb; color:#ffffff; font-size:15px; text-decoration:none; border-radius:6px; font-weight:600; " > Verify Email </a>
          <p style="margin:24px 0 8px; font-size:14px; color:#6b7280;"> If the button doesn’t work, copy and paste this link into your browser: </p> <p style="margin:0; word-break:break-all; font-size:13px; color:#2563eb;"> ${link} </p> <p style="margin:24px 0 0; font-size:13px; color:#6b7280;"> This link will expire soon for security reasons. </p> <hr style="margin:32px 0; border:none; border-top:1px solid #e5e7eb;" /> <p style="margin:0; font-size:12px; color:#9ca3af; line-height:1.6;"> If you didn’t create an account, you can safely ignore this email. </p> <p style="margin:12px 0 0; font-size:12px; color:#9ca3af;"> © ${new Date().getFullYear()} MealHub</p>`,
  });
};
