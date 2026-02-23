import config from "../config";
import { Role } from "../generated/prisma/enums";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

export async function seedAdmin() {
  const admin = {
    name: "Admin",
    email: config.default_admin_email!,
    password: config.default_admin_password!,
    role: Role.ADMIN,
  };

  const existingAdmin = await prisma.user.findUnique({
    where: { email: admin.email },
    select: { id: true, emailVerified: true },
  });

  if (!existingAdmin) {
    console.log("Default admin not found, creating...");
    const createAdmin = await auth.api.signUpEmail({ body: admin });
    if (!createAdmin.user.id) throw new Error("Failed to create admin");

    await prisma.user.update({
      where: { id: createAdmin.user.id },
      data: { emailVerified: true },
    });

    console.log("Default admin created successfully");
  } else if (!existingAdmin.emailVerified) {
    await prisma.user.update({
      where: { id: existingAdmin.id },
      data: { emailVerified: true },
    });
    console.log("Default admin email verified");
  } else {
    // console.log("Default admin already exists and verified");
  }
}
