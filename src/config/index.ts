import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path:path.resolve(process.cwd(),".env")})

export default {
    port: process.env.PORT ?? 5000,
    gmail_user:process.env.GMAIL_USER,
    gmail_pass:process.env.GMAIL_PASS,
    default_admin_email:process.env.DEFAULT_ADMIN_EMAIL,
    default_admin_password:process.env.DEFAULT_ADMIN_PASS
}