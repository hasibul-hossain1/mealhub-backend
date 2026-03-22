import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { sendMail } from "../utils/mailer.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: "https://mealhub-backend-9j3p.onrender.com",
  basePath: "/api/v1/auth",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  trustedOrigins: ["http://localhost:3000","https://tyme2eat.vercel.app"],
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      console.log("mail sent");
      await sendMail({ email: user.email, link: url });
    },
    sendOnSignUp: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required:false
      },
      isActive:{
        type: "boolean",
        required:false
      },
    },
  },
});
