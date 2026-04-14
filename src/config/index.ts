import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const config = {
  port: process.env.PORT ?? 5000,
  gmail_user: process.env.GMAIL_USER,
  gmail_pass: process.env.GMAIL_PASS,
  default_admin_email: process.env.DEFAULT_ADMIN_EMAIL,
  default_admin_password: process.env.DEFAULT_ADMIN_PASSWORD,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  stripe_webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
  frontend_url: process.env.FRONTEND_URL
};

Object.keys(config).forEach((key) => {
    if (!process.env[key.toUpperCase()]) {
        throw new Error(`Missing environment variable: ${key}`);
    }
})

export default config;
